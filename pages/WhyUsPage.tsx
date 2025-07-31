import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

// Icons for the benefit cards
const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BypassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const PrecisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PlatformIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10V7m0 10l-6-3" /></svg>;

// NEW ICONS
const SpeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const FoundationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const GlobalSeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const SecurityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-3.382-9.984z" /></svg>;


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
        text: "We automatically implement advanced Schema Markup and `hreflang` tags. Benefit for you: We give Google a detailed \"map\" of your products and services, making you eligible for Rich Results (like star ratings and prices in search). For multilingual sites, we explicitly tell Google which language to show to which user, ensuring your Thai customers see the Thai version and your international customers see the English one.",
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
    <div className="bg-brand-100/50 p-8 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-brand-200/50">
        <div className="flex items-start gap-6">
            <div className="flex-shrink-0 opacity-80">{icon}</div>
            <div>
                <h3 className="text-xl font-poppins font-bold text-grey-900">{title}</h3>
                <p className="text-grey-600 mt-2 leading-relaxed">{text}</p>
            </div>
        </div>
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
        const baseClasses = 'px-6 py-3 md:px-10 md:py-4 rounded-full text-lg font-semibold font-poppins transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-700';
        if (activeTab === tabName) {
            return `${baseClasses} bg-primary text-white shadow-lg scale-105`;
        }
        return `${baseClasses} bg-white text-grey-600 hover:bg-gray-100`;
    };

    return (
        <>
            <Seo
                title="Why Us – SEO & Market Advantage | Tempa Web.123"
                description="Discover how our data-driven SEO, multilingual strategies, and deep Thai market expertise give your business a competitive edge."
                schema={whyUsSchema}
            />
            <div className="bg-bg-primary font-inter">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-grey-900 leading-tight">
                            Why Smart Businesses Choose Us
                        </h1>
                        <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-grey-600">
                            We combine data-driven SEO, intelligent AI, and deep market expertise to give your business an undeniable edge. See how.
                        </p>
                    </div>
                </section>

                {/* Core Problem Section */}
                <section className="py-12 bg-bg-secondary">
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <h2 className="text-3xl font-bold font-poppins text-grey-900">The Online World is Competitive.</h2>
                        <p className="text-xl text-grey-600 mt-2">Your Advantage Starts Here.</p>
                        <p className="mt-4 max-w-3xl mx-auto text-grey-600">
                           In today's digital marketplace, success isn't just about having a website—it's about having a strategic asset. We cut through the noise, help you bypass costly platform fees, and connect you directly to the customers who matter most.
                        </p>
                    </div>
                </section>

                {/* Two Paths to Success */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="flex justify-center items-center gap-4 mb-12" role="tablist" aria-label="Business Type">
                            <button
                                role="tab"
                                aria-selected={activeTab === 'local'}
                                aria-controls="local-panel"
                                id="local-tab"
                                onClick={() => setActiveTab('local')}
                                className={getTabClasses('local')}
                            >
                                For Local Champions <span className="hidden md:inline">(Thai Business Owners)</span>
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTab === 'global'}
                                aria-controls="global-panel"
                                id="global-tab"
                                onClick={() => setActiveTab('global')}
                                className={getTabClasses('global')}
                            >
                                For Global Sellers <span className="hidden md:inline">(Entering Thailand)</span>
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

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-brand-900 text-white">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Ready to build your market edge?</h2>
                            <p className="text-xl leading-relaxed mb-8 text-brand-200">
                                Let's leverage our expertise to grow your business. Explore our packages or get in touch for a custom strategy.
                            </p>
                            <Link
                                to="/pricing"
                                className="inline-block bg-brand-500 text-white py-4 px-10 rounded-lg text-lg font-bold font-poppins hover:bg-brand-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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