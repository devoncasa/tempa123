import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { SEO_CONTENT } from '../src/content';

// Icons for the benefit cards
const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m7 12 5 5 5-5"/><path d="M12 17V7"/></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const BypassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;
const PrecisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const PlatformIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M21.2 8.4c.5.38.8.97.8 1.6v4c0 .63-.3 1.22-.8 1.6l-6 4.53a2.04 2.04 0 0 1-2.4 0l-6-4.53a2.04 2.04 0 0 1-.8-1.6v-4c0-.63.3-1.22.8-1.6l6-4.53a2.04 2.04 0 0 1 2.4 0l6 4.53z"/><path d="m6.5 12.5 11-6"/><path d="m17.5 6.5-11 6"/></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>;
const SpeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const FoundationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M12 2a10 10 0 0 1 5.09 1.5M12 2a10 10 0 0 0-5.09 1.5"/><path d="M20.5 17a10 10 0 0 1-8.5 3.5M3.5 17a10 10 0 0 0 8.5 3.5"/></svg>;
const GlobalSeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><path d="M11 2a9 9 0 0 0-9 9m18 0a9 9 0 0 0-9-9"/></svg>;
const SecurityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;


const localBenefits = [
    {
        title: 'Dominate Local Search',
        text: 'We use the latest SEO and AI to put your business at the top of Google and LINE searches in Thailand, ensuring you reach customers actively looking for you.',
        icon: <SeoIcon />,
    },
    {
        title: 'Convert Clicks into Customers',
        text: 'Our websites are not just beautiful; they are high-performance conversion machines, optimized for speed and seamless mobile sales.',
        icon: <ConversionIcon />,
    },
    {
        title: 'Own Your Audience',
        text: 'Break free from the 30% platform tax. We build you a digital asset that connects you directly with your customers, maximizing your profit on every sale.',
        icon: <BypassIcon />,
    },
    {
        title: 'Built for Blazing-Fast Speed',
        text: "We obsess over performance. Our templates are optimized for Google's Core Web Vitals, using next-gen image formats (`.webp`) and lightweight code. Benefit for you: Your website loads almost instantly, even on mobile devices with slower connections. Faster sites rank higher on Google and dramatically reduce the number of customers who leave while waiting for a page to load.",
        icon: <SpeedIcon />,
    },
    {
        title: 'A Future-Proof, Low-Maintenance Foundation',
        text: "We build your site with a clean, component-based architecture, avoiding the slow, bloated plugins that plague many platforms. Benefit for you: Your website is stable, reliable, and easy to update without things randomly breaking. You avoid the constant headache and security risks of managing dozens of outdated plugins, saving you time and money in the long run.",
        icon: <FoundationIcon />,
    },
];

const globalBenefits = [
    {
        title: 'Unlock the Thai Market',
        text: 'Our native Thai SEO specialists ensure your products speak the local language and align with local shopping behavior, building immediate trust and relevance.',
        icon: <PrecisionIcon />,
    },
    {
        title: 'Win on Local E-commerce',
        text: 'We optimize your presence not just for Google, but for the platforms where Thais actually shop, including Lazada and Shopee search.',
        icon: <PlatformIcon />,
    },
    {
        title: 'Bridge the Cultural Gap',
        text: 'We go beyond translation. Our AI-driven, cross-cultural mapping ensures your messaging, products, and brand values resonate powerfully with Thai customers.',
        icon: <MapIcon />,
    },
    {
        title: 'Advanced Technical SEO for Global Reach',
        text: `We automatically implement advanced Schema Markup and \`hreflang\` tags. Benefit for you: We give Google a detailed "map" of your products and services, making you eligible for Rich Results (like star ratings and prices in search). For multilingual sites, we explicitly tell Google which language to show to which user, ensuring your Thai customers see the Thai version and your international customers see the English one.`,
        icon: <GlobalSeoIcon />,
    },
    {
        title: 'A Secure & Reliable Platform',
        text: "Security is not an afterthought; it's built into our core. Our templates follow modern security standards to protect against common vulnerabilities like cross-site scripting (XSS). Benefit for you: You can operate with confidence, knowing your business data and your customers' information is protected. This builds the essential trust needed to do business effectively from overseas.",
        icon: <SecurityIcon />,
    },
];

interface BenefitCardProps {
    title: string;
    text: string;
    icon: React.ReactNode;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, text, icon }) => (
    <div className="bg-bg-card p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-brand-900 hover:border-primary">
        <div className="flex items-start gap-6">
            <div className="flex-shrink-0 opacity-80">{icon}</div>
            <div>
                <h3 className="text-xl font-poppins font-bold text-text-primary">{title}</h3>
                <p className="text-text-secondary mt-2 leading-relaxed">{text}</p>
            </div>
        </div>
    </div>
);

const KeyTakeaways: React.FC<{ takeaways: string[] }> = ({ takeaways }) => (
    <div className="bg-bg-card p-6 rounded-lg border-2 border-brand-900">
        <h3 className="font-poppins font-bold text-xl text-text-primary mb-3">Key Takeaways</h3>
        <ul className="space-y-2">
            {takeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


const WhyUsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'local' | 'global'>('local');

    const whyUsSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Why Us – SEO & Market Advantage | Tempa Web.123",
        "about": {
            "@type": "AboutPage",
            "name": "About Tempa Web.123",
            "description": "Discover how our data-driven SEO, multilingual strategies, and deep Thai market expertise give your business a competitive edge."
        }
    };

    const getTabClasses = (tabName: 'local' | 'global') => {
        const baseClasses = 'relative px-6 py-3 md:px-10 md:py-4 rounded-full text-lg font-semibold font-poppins transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';
        if (activeTab === tabName) {
            return `${baseClasses} bg-primary text-white shadow-lg scale-105`;
        }
        return `${baseClasses} bg-bg-card text-text-secondary hover:bg-gray-200`;
    };

    return (
        <>
            <Seo
                title={SEO_CONTENT.WHY_US.title}
                description={SEO_CONTENT.WHY_US.description}
                schema={whyUsSchema}
            />
            <div className="font-inter">
                <section className="relative py-16 md:py-24 bg-bg-section-dark">
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary leading-tight">
                            Why Smart Businesses Choose Us
                        </h1>
                        <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-text-secondary">
                            We combine data-driven SEO, intelligent AI, and deep market expertise to give your business an undeniable edge. See how.
                        </p>
                    </div>
                </section>
                
                <section className="bg-bg-section-light pt-16">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <KeyTakeaways takeaways={[
                            "We offer specialized SEO strategies for both local Thai businesses and global sellers entering the Thai market.",
                            "Our approach focuses on performance, conversion, and helping you bypass high commission fees from other platforms.",
                            "We build future-proof, secure, and low-maintenance websites that serve as long-term strategic assets for your business."
                        ]} />
                    </div>
                </section>


                <section className="bg-bg-section-light py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h2 className="text-3xl font-bold font-poppins text-text-primary text-center">The Online World is Competitive.</h2>
                        <p className="text-xl text-text-secondary mt-2 text-center">Your Advantage Starts Here.</p>
                        <p className="mt-4 max-w-3xl mx-auto text-text-secondary text-center">
                           In today's digital marketplace, success isn't just about having a website—it's about having a strategic asset. We cut through the noise, help you bypass costly platform fees, and connect you directly to the customers who matter most.
                        </p>
                        
                        <div className="flex justify-center items-center p-2 bg-gray-200/70 rounded-full gap-2 mt-12 mb-12 max-w-lg mx-auto" role="tablist" aria-label="Business Type">
                            <button
                                role="tab"
                                aria-selected={activeTab === 'local'}
                                aria-controls="local-panel"
                                id="local-tab"
                                onClick={() => setActiveTab('local')}
                                className={getTabClasses('local')}
                            >
                                For Local Champions
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTab === 'global'}
                                aria-controls="global-panel"
                                id="global-tab"
                                onClick={() => setActiveTab('global')}
                                className={getTabClasses('global')}
                            >
                                For Global Sellers
                            </button>
                        </div>

                        <div className="transition-opacity duration-500">
                            {activeTab === 'local' ? (
                                <div id="local-panel" role="tabpanel" aria-labelledby="local-tab" className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                                    {localBenefits.map((item, index) => (
                                        <BenefitCard key={index} {...item} />
                                    ))}
                                </div>
                            ) : (
                                <div id="global-panel" role="tabpanel" aria-labelledby="global-tab" className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                                    {globalBenefits.map((item, index) => (
                                        <BenefitCard key={index} {...item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" style={{backgroundColor: '#0e7a70'}}>
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-white">Ready to build your market edge?</h2>
                            <p className="text-xl leading-relaxed mb-8 text-gray-200">
                                Let's leverage our expertise to grow your business. Explore our packages or get in touch for a custom strategy.
                            </p>
                            <Link
                                to={SITE_MAP.PRICING}
                                className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-brand-900"
                            >
                                Explore Our Packages
                            </Link>
                        </div>
                    </div>
                </section>
                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                    }
                `}</style>
            </div>
        </>
    );
};

export default WhyUsPage;