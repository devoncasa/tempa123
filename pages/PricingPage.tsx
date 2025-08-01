
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
);


const PricingPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Pricing: Choose Your Path | Tempa Web.123"
        description="Whether you're a hands-on creator or a busy business owner, we have the perfect solution for you. Choose between our DIY and Done-For-You paths."
      />
      <div className="bg-bg-primary font-inter">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">
                Choose Your Path to a Professional Website
              </h1>
              <h4 className="text-lg md:text-xl text-text-secondary mt-4">
                Whether you're a hands-on creator or a busy business owner, we have the perfect solution for you.
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Path 1: DIY Path */}
              <div className="bg-bg-card p-8 rounded-2xl border border-border-primary flex flex-col text-center md:text-left shadow-lg">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-text-primary">For the Hands-On Creator</h2>
                <p className="text-text-secondary mt-1 text-lg">Get the tools. Build it your way.</p>
                
                <div className="text-left my-8 space-y-4">
                    <p className="font-poppins font-semibold text-text-primary">What's Included:</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3"><CheckIcon /> <span>One-Time Purchase, Lifetime Use</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>High-Performance, SEO-Ready Code</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Full Access to All Template Files</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Easy Customization with Simple Instructions</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>6 Months of Updates & Standard Support</span></li>
                    </ul>
                </div>
                
                <div className="text-left bg-bg-secondary p-4 rounded-lg mt-4">
                     <p className="font-poppins font-semibold text-text-primary">Best For:</p>
                     <p className="text-text-secondary text-sm mt-1">Developers, designers, and tech-savvy founders who are comfortable editing HTML/CSS and want full control over their project.</p>
                </div>

                <div className="mt-auto pt-8">
                  <div className="text-center mb-6">
                      <p className="text-4xl font-bold font-poppins text-text-primary">$29 - $79 USD</p>
                      <p className="text-text-secondary text-sm">(One-time template purchase)</p>
                  </div>
                  <Link to="/catalog" className="w-full btn btn-secondary-outline">
                    Browse Templates
                  </Link>
                </div>
              </div>
              
              {/* Path 2: Done For You Path */}
              <div className="relative bg-bg-secondary p-8 rounded-2xl border-2 border-primary flex flex-col text-center md:text-left shadow-2xl">
                <div className="absolute -top-4 right-6 bg-accent text-white text-sm font-poppins font-semibold px-4 py-1 rounded-full shadow-md transform rotate-3">
                  Recommended
                </div>
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-text-primary">For the Busy Business Owner</h2>
                <p className="text-text-secondary mt-1 text-lg">Your vision, professionally built.</p>
                
                <div className="text-left my-8 space-y-4">
                    <p className="font-poppins font-semibold text-text-primary">What's Included:</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Full "Brand Identity Setup" Included</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Professional Content & Image Placement</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Upload to Your Hosting Provider</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>1 Round of Revisions</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Mobile & SEO Optimization Checks</span></li>
                        <li className="flex items-center gap-3"><CheckIcon /> <span>Direct Support from Our Team</span></li>
                    </ul>
                </div>

                <div className="text-left bg-primary/10 p-4 rounded-lg mt-4">
                     <p className="font-poppins font-semibold text-text-primary">Best For:</p>
                     <p className="text-text-secondary text-sm mt-1">Business owners who need a professional website without the technical hassle, allowing them to focus on what they do best: running their business.</p>
                </div>

                <div className="mt-auto pt-8">
                    <div className="text-center mb-6">
                      <p className="text-4xl font-bold font-poppins text-primary-dark">Starts at 2,999 THB</p>
                      <p className="font-bold text-lg text-accent mt-2">+ Free Web Template Included</p>
                      <p className="text-text-secondary text-sm mt-1">(Based on our "Business Ready" service package)</p>
                    </div>
                    <Link to="/pricing/customization-services" className="w-full btn btn-primary-gradient">
                        Learn More About Our Services
                    </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <p className="text-sm text-text-secondary">All prices exclude 7% VAT. The "Done For You" path requires the purchase of a service package.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;