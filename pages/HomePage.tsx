import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, TEMPLATES } from '../constants';
import TemplateCard from '../components/TemplateCard';
import BrandName from '../components/BrandName';
import Seo from '../components/Seo';

const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m7 12 5 5 5-5"/><path d="M12 17V7"/></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const BypassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;

const HomePage: React.FC = () => {
  const featuredTemplates = TEMPLATES.slice(0, 4);
  const displayedCategories = CATEGORIES.slice(0, 8);

  return (
    <>
      <Seo
        title="Tempa Web.123 - Dynamic & Static Website Templates"
        description="Marketplace for ready-to-go website templates. Complete websites with easy-to-use built-in features for instant personalization."
      />
      <div className="space-y-24 md:space-y-32 pb-24">
        {/* Section 2: Hero Section */}
        <section className="relative text-center text-white hero-bg-new py-20 md:py-40">
          <div className="relative z-10 container mx-auto px-6 lg:px-[8vw]">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
              <BrandName /> – Ready-to-go dynamic & static website templates
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

        {/* Section 3: Category Showcase */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
            <div className="bg-bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border-primary">
              <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Explore by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayedCategories.map((category) => (
                  <Link to={`/catalog/${encodeURIComponent(category.name)}`} key={category.name} className="bg-brand-50 p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center border border-transparent hover:border-brand-200">
                    <div className="flex justify-center mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-text-primary font-poppins mb-2">{category.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
        </section>

        {/* Section 4: "Why Us" Teaser */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
            <h2 className="text-3xl font-bold text-center mb-4 font-poppins">Your Advantage Starts Here</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                    <div className="flex justify-center mb-4"><SeoIcon /></div>
                    <h3 className="text-xl font-bold font-poppins mb-2">Dominate Local Search</h3>
                    <p className="text-text-secondary">We use the latest SEO and AI to put your business at the top of Google searches, ensuring you reach customers actively looking for you.</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-4"><ConversionIcon /></div>
                    <h3 className="text-xl font-bold font-poppins mb-2">Convert Clicks Into Customers</h3>
                    <p className="text-text-secondary">Our websites are not just beautiful; they are high-performance conversion machines, optimized for speed and seamless mobile sales.</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-4"><BypassIcon /></div>
                    <h3 className="text-xl font-bold font-poppins mb-2">Own Your Audience</h3>
                    <p className="text-text-secondary">Break free from the 30% platform tax. We build you a digital asset that connects you directly with your customers, maximizing your profit on every sale.</p>
                </div>
            </div>
            <div className="text-center mt-12">
                <Link to="/why-us" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                    Learn more about our strategy &rarr;
                </Link>
            </div>
        </section>

        {/* Section 5: Featured Templates */}
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

        {/* Section 6: Inspiration Gallery Teaser */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
            <div className="inspiration-gallery-section">
                <h2 className="text-3xl font-bold mb-8 font-poppins">Unlock Your Creative Potential</h2>
                <div className="video-frame">
                    <video autoPlay loop muted playsInline preload="metadata" poster="https://raw.githubusercontent.com/devoncasa/Tempa123/main/tempa123-photo-gallery-cover.jpg">
                        <source src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/tempa12.-photo-gallery.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p className="gallery-cta-text">
                    See how our templates can be transformed. Choose a <Link to="/pricing/customization-services">customization package</Link> to unlock your full potential.
                </p>
            </div>
        </section>

        {/* Section 7: Final Call to Action (CTA) */}
        <section className="py-20" style={{backgroundColor: 'var(--brand-900)'}}>
            <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                <h2 className="text-3xl font-bold font-poppins mb-6 text-white">Ready to build your market edge?</h2>
                <Link 
                    to="/pricing" 
                    className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-brand-900 !px-8 !py-3 !text-base"
                >
                    Explore Our Packages
                </Link>
            </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;