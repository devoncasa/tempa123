import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { PRICING_FAQ_ITEMS } from '../constants';
import FaqItem from '../components/FaqItem';
import { SITE_MAP } from '../src/siteMap';
import { SEO_CONTENT } from '../src/content';

const CheckIcon: React.FC<{ className?: string }> = ({ className = 'text-brand-700' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <p className="text-text-secondary mt-2">{tier.description}</p>
            <div className="my-8">
                <span className="text-5xl font-bold font-poppins text-accent">{tier.price}</span>
                <span className="text-text-secondary">{tier.pricePeriod}</span>
            </div>
            <ul className="space-y-4 text-left mb-10 flex-grow">
                {tier.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-text-secondary">{feature}</span>
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
            description: 'Perfect for a single project.',
            price: 'From $29',
            pricePeriod: '',
            features: [
                '1 template included',
                'Use for a single project',
                'Lifetime updates for the template',
                '6 months of standard support',
                'Full access to template files'
            ],
            buttonText: 'Browse Templates',
            buttonLink: SITE_MAP.CATALOG,
            recommended: false,
        },
        {
            title: 'All-Access Membership',
            description: 'For creators building multiple sites.',
            price: '$15',
            pricePeriod: '/mo',
            features: [
                'Access all 90+ templates',
                'Access to the Inspiration Gallery',
                'Use for unlimited projects',
                'Continuous access to new templates',
                'Ongoing premium support',
                'Cancel anytime from your dashboard'
            ],
            buttonText: 'Become a Member',
            buttonLink: SITE_MAP.MY_ACCOUNT,
            recommended: true,
        },
        {
            title: 'Extended License',
            description: 'For commercial end-products.',
            price: '$299',
            pricePeriod: '/template',
            features: [
                '1 template included',
                'Use in a commercial end-product (e.g., SaaS)',
                'Lifetime updates for the template',
                '12 months of premium support',
                'Full access to template files'
            ],
            buttonText: 'Contact for License',
            buttonLink: SITE_MAP.CONTACT,
            recommended: false,
        },
    ];

  return (
    <>
      <Seo
        title={SEO_CONTENT.PRICING.title}
        description={SEO_CONTENT.PRICING.description}
      />
      <div className="bg-bg-secondary py-16 md:py-24">
        {/* Header */}
        <section className="container mx-auto px-6 lg:px-[8vw] text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">
            Flexible Pricing for Everyone
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mt-4 max-w-3xl mx-auto">
            From single templates to all-access memberships, we have a plan that fits your project and budget. All plans come with high-quality code and support.
          </p>
        </section>

        {/* Pricing Table */}
        <section className="container mx-auto px-6 lg:px-[8vw]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {pricingTiers.map(tier => <PricingCard key={tier.title} tier={tier} />)}
            </div>
            <p className="text-center text-sm text-text-secondary mt-8">All prices are in USD and exclude any applicable taxes.</p>
        </section>

        {/* Customization CTA */}
        <section className="container mx-auto px-6 lg:px-[8vw] mt-24">
            <div className="bg-brand-900 text-white rounded-2xl p-12 text-center max-w-5xl mx-auto shadow-xl">
                 <h2 className="text-3xl font-bold font-poppins">Need Help with Setup or Customization?</h2>
                 <p className="mt-4 mb-8 text-lg text-gray-300 max-w-2xl mx-auto">
                     Short on time or technical skills? Let our expert team build your website for you. We'll handle everything from setup to content placement.
                 </p>
                 <Link to={SITE_MAP.PRICING_CUSTOMIZATION} className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-brand-900">
                    View Customization Services
                 </Link>
            </div>
        </section>


        {/* FAQ Section */}
        <section className="container mx-auto px-6 lg:px-[8vw] mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto bg-bg-card p-8 rounded-2xl shadow-xl border border-border-primary">
            {PRICING_FAQ_ITEMS.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;