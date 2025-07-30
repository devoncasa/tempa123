import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TEMPLATES, CATEGORIES } from '../constants';
import TemplateCard from '../components/TemplateCard';
import { TemplateCategory } from '../types';
import Seo from '../components/Seo';

const CatalogPage: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'static' | 'dynamic'>('all');

  useEffect(() => {
    if (urlCategory) {
      const decodedCategory = decodeURIComponent(urlCategory);
      const foundCategory = Object.values(TemplateCategory).find(c => c === decodedCategory);
      setSelectedCategory(foundCategory || 'all');
    } else {
      setSelectedCategory('all');
    }
  }, [urlCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory as TemplateCategory | 'all');
    if (newCategory === 'all') {
      navigate('/catalog');
    } else {
      navigate(`/catalog/${encodeURIComponent(newCategory)}`);
    }
  };

  const getButtonClasses = (buttonType: typeof typeFilter) => {
    const baseClasses = 'px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-opacity-50';
    if (typeFilter === buttonType) {
      return `${baseClasses} bg-primary text-white shadow`;
    }
    return `${baseClasses} bg-white text-grey-900 hover:bg-gray-100`;
  };

  const filteredTemplates = TEMPLATES
    .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
    .filter(template => {
        if (typeFilter === 'all') return true;
        if (typeFilter === 'static') return !template.isDynamic;
        if (typeFilter === 'dynamic') return template.isDynamic;
        return true;
    });

  const pageTitle = selectedCategory === 'all' ? 'Template Catalog' : `${selectedCategory} Templates`;
  const pageDescription = `Browse our collection of ${selectedCategory === 'all' ? '' : selectedCategory.toLowerCase()} website templates. Find the perfect design for your next project.`;

  return (
    <>
      <Seo 
        title={`${pageTitle} | Tempa Web.123`}
        description={pageDescription}
      />
      <div className="container mx-auto px-6 lg:px-[8vw] py-12">
        <h1 className="text-4xl font-bold text-center font-poppins mb-4">Template Catalog</h1>
        <p className="text-center text-lg text-grey-600 mb-8">Find the perfect design for your next project.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-12">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full md:w-auto md:max-w-xs p-3 border border-grey-200 rounded-lg shadow-sm text-base bg-white focus:ring-brand-700 focus:border-brand-700"
            aria-label="Filter templates by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 p-1 bg-gray-200 rounded-full">
              <button onClick={() => setTypeFilter('all')} className={getButtonClasses('all')}>All Types</button>
              <button onClick={() => setTypeFilter('static')} className={getButtonClasses('static')}>Static</button>
              <button onClick={() => setTypeFilter('dynamic')} className={getButtonClasses('dynamic')}>Dynamic</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold text-grey-900">No templates found</h2>
            <p className="text-grey-600 mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogPage;