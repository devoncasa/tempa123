import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, TEMPLATES, FAQ_ITEMS } from '../constants';
import TemplateCard from '../components/TemplateCard';
import FaqItem from '../components/FaqItem';
import BrandName from '../components/BrandName';
import Seo from '../components/Seo';

const HomePage: React.FC = () => {
  const featuredTemplates = TEMPLATES.slice(0, 4);
  const displayedCategories = CATEGORIES.slice(0, 8); // Show a curated list of categories

  return (
    <>
      <Seo
        title="Tempa Web.123 - Dynamic & Static Website Templates"
        description="Marketplace for ready-to-go website templates. Complete websites with easy-to-use built-in features for instant personalization."
      />
      <div className="space-y-24 md:space-y-32 pb-24">
        {/* Hero Section */}
        <section className="relative text-center text-white bg-text-primary py-20 md:py-40">
          <div className="absolute inset-0 bg-hero-pattern opacity-10 parallax-bg"></div>
          <div className="relative z-10 container mx-auto px-6 lg:px-[8vw]">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
              <BrandName className="tracking-wide-sm" />
              <span className="text-gray-200"> — Ready-to-go dynamic & static website templates</span>
            </h1>
            <p className="text-lg md:text-xl font-inter mt-4 max-w-3xl mx-auto text-gray-300">
              Complete websites with easy-to-use built-in features for instant personalization.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link to="/catalog" className="btn btn-primary-gradient">
                Browse Templates
              </Link>
              <Link to="/catalog" className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-text-primary">
                View Demos
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
            <div className="bg-bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border-primary">
              <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Explore by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayedCategories.map((category) => (
                  <Link to={`/catalog/${encodeURIComponent(category.name)}`} key={category.name} className="bg-bg-card p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center border border-border-primary hover:border-primary">
                    <div className="flex justify-center mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-text-primary font-poppins mb-2">{category.name}</h3>
                    <p className="text-text-secondary text-sm flex-grow">{category.description}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                  <Link to="/catalog" className="btn btn-primary-gradient">
                      View All Categories
                  </Link>
              </div>
            </div>
        </section>

        {/* Featured Templates */}
        <section className="bg-bg-secondary py-20">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Featured Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 lg:px-[8vw] text-center">
            <div className="bg-bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border-primary">
              <h2 className="text-3xl font-bold mb-12 font-poppins">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <div className="bg-bg-secondary text-primary rounded-full p-6 mb-4">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2">1. Preview Live Demo</h3>
                  <p className="text-text-secondary">Explore our templates with fully interactive live demos.</p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="bg-bg-secondary text-primary rounded-full p-6 mb-4">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2">2. Choose & Buy</h3>
                  <p className="text-text-secondary">Select the perfect template and pricing tier for your needs.</p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="bg-bg-secondary text-primary rounded-full p-6 mb-4">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2">3. Add Your Personal Touch</h3>
                  <p className="text-text-secondary">In just a few clicks, you can upload your content, adjust colors, and have your website ready to launch.</p>
                </div>
              </div>
            </div>
        </section>

        {/* Pricing CTA Section */}
        <section className="bg-bg-secondary py-20">
          <div className="container mx-auto px-6 lg:px-[8vw] text-center">
            <h2 className="text-3xl font-bold font-poppins mb-4">Flexible Pricing for Everyone</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              From single templates to all-access memberships, we have a plan that fits your needs. Get started today with our competitive, developer-friendly pricing.
            </p>
            <Link 
              to="/pricing" 
              className="btn btn-primary-gradient"
            >
              View Pricing Plans
            </Link>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
          <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto bg-bg-card p-8 rounded-2xl shadow-xl border border-border-primary">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;