import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TEMPLATES, CATEGORIES, CATEGORY_FAQ_ITEMS, getTemplatePriceUSD } from '../constants';
import TemplateCard from '../components/TemplateCard';
import { Template, TemplateCategory, FaqItem as FaqItemType } from '../types';
import Seo from '../components/Seo';
import FaqItem from '../components/FaqItem';
import { SITE_MAP, getCatalogCategoryPath } from '../src/siteMap';
import { SEO_CONTENT } from '../src/content';

const CatalogPage: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [styleFilter, setStyleFilter] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price_asc' | 'price_desc'>('popular');
  const [categoryFaqs, setCategoryFaqs] = useState<FaqItemType[]>([]);

  useEffect(() => {
    let currentCategory: TemplateCategory | 'all' = 'all';
    if (urlCategory) {
      const decodedCategory = decodeURIComponent(urlCategory);
      const foundCategory = Object.values(TemplateCategory).find(c => c === decodedCategory);
      if (foundCategory) {
        currentCategory = foundCategory;
      }
    }
    setSelectedCategory(currentCategory);
    
    if (currentCategory !== 'all' && CATEGORY_FAQ_ITEMS[currentCategory]) {
      setCategoryFaqs(CATEGORY_FAQ_ITEMS[currentCategory]);
    } else {
      setCategoryFaqs([]);
    }
  }, [urlCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    if (newCategory === 'all') {
      navigate(SITE_MAP.CATALOG);
    } else {
      navigate(getCatalogCategoryPath(newCategory));
    }
  };

  const filteredAndSortedTemplates = useMemo(() => {
    let templates = TEMPLATES
      .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
      .filter(template => styleFilter === 'all' || template.style === styleFilter);

    switch (sortBy) {
      case 'newest':
        templates.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
        break;
      case 'price_asc':
        templates.sort((a, b) => getTemplatePriceUSD(a) - getTemplatePriceUSD(b));
        break;
      case 'price_desc':
        templates.sort((a, b) => getTemplatePriceUSD(b) - getTemplatePriceUSD(a));
        break;
      case 'popular':
      default:
        templates.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return templates;
  }, [selectedCategory, styleFilter, sortBy]);

  const allStyles = useMemo(() => {
    const styles = new Set(TEMPLATES.map(t => t.style).filter(Boolean));
    return Array.from(styles) as string[];
  }, []);

  const pageTitle = selectedCategory === 'all' ? SEO_CONTENT.CATALOG.title : `${selectedCategory} Templates | Tempa Web.123`;
  const pageDescription = SEO_CONTENT.CATALOG.description;

  const faqSchema = categoryFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categoryFaqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' ? item.answer : 'Details available on the page.'
      }
    }))
  } : undefined;

  const selectClasses = "w-full md:w-auto p-3 border border-border-primary rounded-lg shadow-sm text-base bg-bg-card focus:ring-primary focus:border-primary transition-colors";

  return (
    <>
      <Seo 
        title={pageTitle}
        description={pageDescription}
        schema={faqSchema}
      />
      <div>
        <section className="bg-bg-section-dark py-12 md:py-20">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            <h1 className="text-4xl font-bold text-center font-poppins mb-4">Our Template Catalog</h1>
            <p className="text-center text-lg text-text-secondary mb-12">Find the perfect foundation for your next project. Professionally designed, fully responsive, and ready to customize.</p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 p-4 bg-bg-card/80 rounded-xl shadow-md border-2 border-brand-900 sticky top-[85px] z-40 backdrop-blur-sm">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={selectClasses}
                aria-label="Filter templates by category"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className={selectClasses}
                aria-label="Filter templates by style"
              >
                <option value="all">All Styles</option>
                {allStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
               <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={selectClasses}
                aria-label="Sort templates"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="newest">Sort: Newest</option>
                <option value="price_asc">Sort: Price (Low to High)</option>
                <option value="price_desc">Sort: Price (High to Low)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            {filteredAndSortedTemplates.length === 0 && (
              <div className="col-span-full text-center py-20">
                <h2 className="text-2xl font-semibold text-text-primary">No templates found</h2>
                <p className="text-text-secondary mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </section>
        
        {categoryFaqs.length > 0 && (
          <section className="bg-bg-section-light py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-[8vw]">
                <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions for {selectedCategory}</h2>
                <div className="max-w-3xl mx-auto bg-bg-card p-8 rounded-2xl shadow-xl border-2 border-brand-900">
                  {categoryFaqs.map((item) => (
                    <FaqItem key={item.question} item={item} />
                  ))}
                </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default CatalogPage;