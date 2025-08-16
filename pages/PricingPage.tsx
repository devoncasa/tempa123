

import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import FaqItem from '../components/FaqItem';
import { SITE_MAP } from '../src/siteMap';
import { SEO_CONTENT } from '../src/content';

const CheckIcon: React.FC<{ className?: string }> = ({ className = 'text-brand-700' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className} flex-shrink-0 mt-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PricingCard: React.FC<{ tier: any }> = ({ tier }) => {
    const isRecommended = tier.recommended;
    const cardClasses = `border rounded-2xl p-8 flex flex-col text-center transition-all duration-300 relative ${isRecommended ? 'bg-white border-2 border-primary shadow-2xl scale-105' : 'bg-bg-card border-border-primary shadow-lg'}`;
    const buttonClasses = `w-full mt-auto py-3 px-6 rounded-full uppercase text-sm font-semibold tracking-wide-sm transition-all duration-300 ${isRecommended ? 'btn btn-primary-gradient' : 'btn btn-secondary-outline'}`;
    
    return (
        <div className={cardClasses}>
            {isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-poppins font-semibold px-4 py-1 rounded-full shadow-md transform -rotate-3">
                    BEST VALUE
                </div>
            )}
            <h3 className="text-2xl font-bold font-poppins text-text-primary">{tier.title}</h3>
            <p className="text-text-secondary mt-2 h-12">{tier.description}</p>
            <div className="my-6">
                <div className="text-5xl font-poppins text-accent" dangerouslySetInnerHTML={{ __html: tier.price }} />
                <p className="text-text-secondary mt-2">{tier.billingInfo}</p>
            </div>
            <ul className="space-y-4 text-left mb-10 flex-grow">
                {tier.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-text-secondary" dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                ))}
            </ul>
            <Link to={tier.buttonLink} className={buttonClasses}>{tier.buttonText}</Link>
        </div>
    );
};


const PricingPage: React.FC = () => {

    const pricingTiers = [
        {
            title: 'Single Template',
            description: 'Perfect for a single, beautifully crafted project.',
            price: 'From <strong>$29</strong>',
            billingInfo: 'One-time payment',
            features: [
                'Use for <strong>1 personal or commercial</strong> project',
                '<strong>Lifetime updates</strong> for that specific template',
                '<strong>6 months</strong> of standard email support',
                'Full access to all template files'
            ],
            buttonText: 'Browse Templates',
            buttonLink: SITE_MAP.CATALOG,
            recommended: false,
        },
        {
            title: 'All-Access Membership',
            description: 'The ultimate toolkit for creators and agencies.',
            price: '<strong>$29</strong> /mo',
            billingInfo: 'Or save 25% with annual billing ($259/year)',
            features: [
                'Access to <strong>all 10,000+ templates</strong>',
                'Access to all <strong>new templates</strong> added monthly',
                'Use for <strong>unlimited</strong> projects (personal or client)',
                '<strong>Priority email support</strong> (guaranteed <24hr response)',
                'Cancel anytime from your dashboard'
            ],
            buttonText: 'Start Building Now',
            buttonLink: SITE_MAP.MY_ACCOUNT,
            recommended: true,
        },
        {
            title: 'Extended License',
            description: 'For products where the template is the core value.',
            price: '<strong>$299</strong>',
            billingInfo: 'Per template, one-time payment',
            features: [
                'Use in a commercial <strong>end-product for sale</strong>',
                'Perfect for SaaS, themes, or app templates',
                '<strong>12 months</strong> of premium, hands-on support',
                'Full legal rights for resale applications'
            ],
            buttonText: 'Contact for License',
            buttonLink: SITE_MAP.CONTACT,
            recommended: false,
        },
    ];

    const faqItems = [
        {
            question: 'What counts as an "end-product for sale"?',
            answer: 'This is for when you are selling a product where our template provides the core value. For example, if you sell a SaaS application, a WordPress theme, or a template on another marketplace. If you are building a website for a client, the All-Access Membership is the perfect choice.'
        },
        {
            question: 'What is the difference between "Standard" and "Priority" support?',
            answer: 'Standard support provides help with bug fixes and general questions via email within 48 hours. Priority support guarantees a response within 24 hours and includes guidance on basic customization.'
        },
        {
            question: 'Can I cancel my membership anytime?',
            answer: 'Absolutely. You can cancel your All-Access Membership at any time directly from your account dashboard. You will retain access until the end of your current billing period.'
        },
        {
            question: 'What happens to the sites I built if I cancel my membership?',
            answer: 'Any websites you built using our templates while your membership was active are yours to keep and use forever. You just won\'t receive any further updates for those templates or get access to new ones.'
        },
    ];

  return (
    <>
      <Seo
        title={SEO_CONTENT.PRICING.title}
        description={SEO_CONTENT.PRICING.description}
      />
      <div>
        {/* Header */}
        <section className="bg-bg-section-dark py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-[8vw] text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">
              Flexible Pricing for Every Creator
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mt-4 max-w-3xl mx-auto">
              Whether you're starting a single project or building an empire, we have a plan that fits your ambition. All plans come with high-quality, performance-optimized code.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="bg-bg-section-light py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-[8vw]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {pricingTiers.map(tier => <PricingCard key={tier.title} tier={tier} />)}
                </div>
                <p className="text-center text-sm text-text-secondary mt-8">All prices are in USD and exclude any applicable taxes.</p>
            </div>
        </section>

        {/* Customization CTA */}
        <section className="bg-bg-section-dark py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-[8vw]">
              <div className="bg-brand-900 text-white rounded-2xl p-12 text-center max-w-5xl mx-auto shadow-xl">
                   <h2 className="text-3xl font-bold font-poppins">Need Help with Setup or Customization?</h2>
                   <p className="mt-4 mb-8 text-lg text-gray-300 max-w-2xl mx-auto">
                       Short on time or technical skills? Let our expert team build your website for you. We'll handle everything from setup to content placement.
                   </p>
                   <Link to={SITE_MAP.PRICING_CUSTOMIZATION} className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-brand-900">
                      View Customization Services
                   </Link>
              </div>
            </div>
        </section>


        {/* FAQ Section */}
        <section className="bg-bg-section-light py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto bg-bg-card p-8 rounded-2xl shadow-xl border border-border-primary">
              {faqItems.map((item) => (
                <FaqItem key={item.question} item={item} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;