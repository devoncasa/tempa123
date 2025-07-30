
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import FaqItem from '../components/FaqItem';

const FoundationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M12 3v18" /></svg>
);
const TranslationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 0h5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l2 2m6-4h-3a2 2 0 00-2 2v3a2 2 0 002 2h3" /></svg>
);
const LaunchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

const MULTILINGUAL_FAQ_ITEMS = [
    {
        question: "Which languages do you support?",
        answer: "We can support almost any world language. Our most requested are English, Thai, Chinese (Mandarin), Japanese, and German. Please contact us if you have a specific request."
    },
    {
        question: "Does this service include multilingual SEO?",
        answer: "This service includes the technical foundation for multilingual SEO, such as implementing hreflang tags. A full SEO strategy for each language (like keyword research) would be part of a custom project."
    },
    {
        question: "How long does it take to add a new language?",
        answer: "The initial technical setup takes about 3-4 business days. Each language then typically takes 7-10 business days, depending on the complexity of your site's content."
    }
];

const MultilingualServicePage: React.FC = () => {
    return (
        <>
            <Seo
                title="Professional Multilingual Website Services | Tempa Web.123"
                description="Reach a global audience. Our service professionally translates and localizes your website, building trust and opening your business to new markets."
            />
            <div className="bg-white">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-bg-secondary">
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-brand-900 leading-tight">
                            Reach a Global Audience
                        </h1>
                        <p className="text-xl text-grey-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                            Speak your customer's language. Our multilingual service professionally translates and localizes your website, building trust and opening your business to new markets around the world.
                        </p>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h2 className="text-3xl font-bold font-poppins text-center mb-16">Our Proven 3-Step Process</h2>
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="flex flex-col items-center">
                                <div className="bg-brand-100 text-brand-700 rounded-full p-6 mb-6">
                                    <FoundationIcon />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">1. Technical Foundation</h3>
                                <p className="text-grey-600">We implement the core technology, making your site ready for multiple languages, including URL setup and a language switcher.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-brand-100 text-brand-700 rounded-full p-6 mb-6">
                                    <TranslationIcon />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">2. Professional Translation</h3>
                                <p className="text-grey-600">Our native-speaking experts translate your content, ensuring it is not just accurate, but culturally effective and localized.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-brand-100 text-brand-700 rounded-full p-6 mb-6">
                                    <LaunchIcon />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">3. Launch & Verify</h3>
                                <p className="text-grey-600">We implement the translated content, test every page and link, and launch your new multilingual website to the world.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-16 md:py-24 bg-bg-secondary">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h2 className="text-3xl font-bold font-poppins text-center mb-4">Transparent Pricing</h2>
                        <p className="text-lg text-grey-600 text-center max-w-3xl mx-auto mb-12">
                            A clear, two-part pricing structure for a powerful global presence. Start with the technical setup, then add the language packages you need.
                        </p>

                        <div className="grid lg:grid-cols-5 gap-8 items-start">
                            {/* Card 1: Setup */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg border border-grey-200">
                                <h3 className="text-2xl font-bold font-poppins text-brand-900">One-Time Technical Setup</h3>
                                <p className="font-semibold text-grey-600 mt-1 mb-4">(Required for all projects)</p>
                                <p className="text-4xl font-bold font-poppins text-brand-700">4,999 THB</p>
                                <p className="text-grey-600 mb-6">~$140 USD</p>
                                <p className="font-semibold text-grey-900 mb-2">Includes:</p>
                                <ul className="list-disc list-inside space-y-2 text-grey-600">
                                    <li>Core plugin/module installation</li>
                                    <li>URL structure configuration</li>
                                    <li>Language switcher implementation</li>
                                    <li>Technical testing</li>
                                </ul>
                            </div>
                            
                            {/* Card 2: Packages */}
                            <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-lg border border-grey-200">
                                <h3 className="text-2xl font-bold font-poppins text-brand-900">Per-Language Content Packages</h3>
                                <p className="font-semibold text-grey-600 mt-1 mb-6">(Up to 7 pages of content)</p>
                                
                                <div className="space-y-6">
                                    <div className="bg-brand-100/50 p-6 rounded-lg border border-brand-200">
                                        <h4 className="font-bold text-lg text-grey-900">Tier 1: English / Thai Package</h4>
                                        <p className="text-3xl font-bold font-poppins text-brand-700 mt-2">+ 5,999 THB</p>
                                        <p className="text-grey-600">~$170 USD per language</p>
                                    </div>
                                    <div className="bg-gray-100 p-6 rounded-lg border border-grey-200">
                                        <h4 className="font-bold text-lg text-grey-900">Tier 2: World Language Package</h4>
                                        <p className="text-grey-600 text-sm">(e.g., Japanese, Chinese, German)</p>
                                        <p className="text-3xl font-bold font-poppins text-grey-900 mt-2">+ 17,999 THB</p>
                                        <p className="text-grey-600">~$510 USD per language</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto border border-grey-200">
                            <h4 className="font-bold font-poppins text-center text-lg mb-2">Why are the prices different?</h4>
                            <p className="text-grey-600 text-center leading-relaxed">
                                Our pricing reflects the resources required for guaranteed quality. For English and Thai, our in-house team can manage and audit the content, keeping costs lower. For other world languages, we invest in professional, native-speaking human translators and localization experts to ensure your message is culturally appropriate and effective. This investment guarantees a premium result that resonates with a global audience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h3 className="text-3xl font-bold text-center mb-12 font-poppins">Multilingual Service FAQs</h3>
                        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-grey-200">
                            {MULTILINGUAL_FAQ_ITEMS.map((item) => (
                                <FaqItem key={item.question} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                 <section className="py-16 md:py-24 bg-brand-700 text-white">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Ready to Go Global?</h2>
                            <p className="text-xl leading-relaxed mb-8">
                                Let's discuss your project and how we can help you expand your reach.
                            </p>
                            <Link 
                                to="/contact" 
                                className="inline-block bg-white text-brand-700 py-4 px-10 rounded-lg text-lg font-bold font-poppins hover:bg-brand-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Contact Us Today
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MultilingualServicePage;
