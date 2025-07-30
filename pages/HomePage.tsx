
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, TEMPLATES, PRICING_TIERS, FAQ_ITEMS } from '../constants';
import TemplateCard from '../components/TemplateCard';
import FaqItem from '../components/FaqItem';

const HomePage: React.FC = () => {
  const featuredTemplates = TEMPLATES.slice(0, 4);
  const displayedCategories = CATEGORIES.slice(0, 8); // Show a curated list of categories

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative text-center text-white bg-gray-700 py-20 md:py-40">
        <div className="absolute inset-0 bg-hero-pattern opacity-30 parallax-bg"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-primary leading-tight">
            Tempa123 — Ready-to-go dynamic & static website templates
          </h1>
          <p className="text-lg md:text-xl font-inter mt-4 max-w-3xl mx-auto text-gray-200">
            Complete websites you can customize instantly using Google AI Studio.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/catalog" className="bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Browse Templates
            </Link>
            <Link to="/catalog" className="bg-white text-secondary border border-secondary py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-105">
              View Demos
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Explore by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCategories.map((category) => (
            <Link to={`/catalog/${encodeURIComponent(category.name)}`} key={category.name} className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center">
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-primary font-poppins mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm flex-grow">{category.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/catalog" className="bg-secondary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-opacity-90 transition-all duration-300">
                View All Categories
            </Link>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Featured Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 font-poppins">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="bg-secondary text-white rounded-full p-6 mb-4">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">1. Preview Live Demo</h3>
            <p className="text-gray-600">Explore our templates with fully interactive live demos.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-secondary text-white rounded-full p-6 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">2. Choose & Buy</h3>
            <p className="text-gray-600">Select the perfect template and pricing tier for your needs.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-secondary text-white rounded-full p-6 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">3. Customize with AI</h3>
            <p className="text-gray-600">Use Google AI Studio to instantly personalize your new website.</p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, index) => (
              <div key={tier.title} className={`bg-card-bg p-8 rounded-lg shadow-lg text-center border-t-4 ${index === 1 ? 'border-primary' : 'border-secondary'}`}>
                <h3 className="text-2xl font-bold font-poppins mb-2">{tier.title}</h3>
                <p className="text-3xl font-bold text-primary mb-6">{tier.priceRange}</p>
                <ul className="space-y-3 text-gray-600 mb-8">
                  {tier.features.map(feature => <li key={feature} className="flex items-center justify-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>{feature}</li>)}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg uppercase text-sm font-semibold tracking-wide-sm transition-colors duration-300 ${index === 1 ? 'bg-primary text-white hover:bg-opacity-90' : 'bg-secondary text-white hover:bg-opacity-90'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;