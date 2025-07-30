import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem';
import Seo from '../components/Seo';

const PRICING_FAQ_ITEMS = [
    {
        question: "Do I need to buy hosting separately?",
        answer: "Yes, our templates are a one-time purchase for the website files. You will need a separate hosting plan and a domain name to make your website live on the internet. This gives you the freedom to choose any hosting provider you prefer."
    },
    {
        question: "What is your refund policy?",
        answer: "Due to the digital nature of our products, all sales are final and we do not offer refunds once a template has been downloaded. We provide extensive live demos for every template, so you can see exactly what you're getting before you buy."
    },
    {
        question: "Can I use a template for multiple projects?",
        answer: "Our Regular License grants you the right to use a template for one single end-product (e.g., a single website for yourself or a client). If you need to use the same template for a second project, you must purchase a second license. For multiple uses, our Extended License is the more economical option."
    },
    {
        question: "What's the difference between a Regular and an Extended License?",
        answer: "The Regular License is for a single commercial project that is not for sale (e.g., your portfolio, a client's website). The Extended License is required if your end-product is intended to be sold (e.g., a SaaS application, a website builder, or any project where the template is a core part of a product you sell)."
    },
];

const pricingData = [
    { type: 'data' as const, feature: 'Price Range', regular: '$29 - $79', extended: 'From $299', bold: true },
    { type: 'header' as const, title: 'Core Usage Rights' },
    { type: 'data' as const, feature: 'Number of End Products', regular: '1 Final Product', extended: '1 Final Product' },
    { type: 'data' as const, feature: 'Use on a Single Domain', regular: '✅', extended: '✅' },
    { type: 'data' as const, feature: 'Use for a Client Project', regular: '✅', extended: '✅' },
    { type: 'header' as const, title: 'Commercial & Resale Rights' },
    { type: 'data' as const, feature: 'Use in an End Product for Sale*', regular: '❌', extended: '✅' },
    { type: 'data' as const, feature: 'Resell/Redistribute Template', regular: '❌', extended: '❌' },
    { type: 'header' as const, title: 'Features & Support' },
    { type: 'data' as const, feature: 'Template Updates', regular: '6 Months Included', extended: '12 Months Included' },
    { type: 'data' as const, feature: 'Technical Support', regular: '6 Months Included', extended: '12 Months Premium Support' },
    { type: 'data' as const, feature: 'Design Source Files (Figma)', regular: '❌', extended: '✅' },
    { type: 'data' as const, feature: 'Perfect For', regular: 'Freelancers & Individuals', extended: 'SaaS, Agencies & Startups', bold: true },
];

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const FeatureCell: React.FC<{ value: string; bold?: boolean, isExtended?: boolean }> = ({ value, bold, isExtended }) => {
    if (value === '✅') return <CheckIcon />;
    if (value === '❌') return <CrossIcon />;
    const boldClass = bold ? `font-bold ${isExtended ? 'text-brand-900' : 'text-brand-700'}` : 'text-grey-600';
    return <span className={boldClass}>{value}</span>;
};

const DomainChecker: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState<{ message: string; type: 'success' | 'error' | 'idle' }>({ message: '', type: 'idle' });

    const handleCheckDomain = (e: FormEvent) => {
        e.preventDefault();
        if (!domain) {
            setResult({ message: 'Please enter a domain name to check.', type: 'error' });
            return;
        }
        
        // Mock check
        if (domain.includes('taken')) {
            setResult({ message: `Sorry, ${domain} is already taken.`, type: 'error' });
        } else {
            setResult({ message: `Congratulations! ${domain} is available!`, type: 'success' });
        }
    };

    const resultColor = result.type === 'success' ? 'text-success' : 'text-error';

    return (
        <div className="bg-bg-secondary p-8 rounded-lg shadow-md">
            <form onSubmit={handleCheckDomain} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="your-dream-website.com"
                    className="flex-grow p-4 border border-grey-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                />
                <button
                    type="submit"
                    className="bg-primary text-white py-4 px-8 rounded-lg font-bold hover:bg-primary-hover transition-colors"
                >
                    Search
                </button>
            </form>
            {result.type !== 'idle' && (
                <p className={`mt-4 text-center font-semibold ${resultColor}`}>{result.message}</p>
            )}
        </div>
    );
};


const PricingPage: React.FC = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": PRICING_FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };
    
    return (
        <>
            <Seo
                title="Pricing & Licenses | Tempa Web.123"
                description="Transparent, one-time pricing for website templates. Choose between a Regular or Extended license to fit your project needs."
                schema={faqSchema}
            />
            <div className="bg-bg-primary">
                {/* Section A: Domain Name Services */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-poppins">Find the Perfect Domain Name</h1>
                            <p className="text-lg text-grey-600 mt-4 mb-8">
                                Your website's address is the first thing your visitors see. Make it a great one.
                            </p>
                        </div>
                        <DomainChecker />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12 max-w-4xl mx-auto">
                            <div className="bg-white p-4 rounded-lg border border-grey-200">
                                <p className="font-bold text-lg">.com</p><p className="text-grey-600">$15.99/yr</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-grey-200">
                                <p className="font-bold text-lg">.net</p><p className="text-grey-600">$17.99/yr</p>
                            </div>
                             <div className="bg-white p-4 rounded-lg border border-grey-200">
                                <p className="font-bold text-lg">.org</p><p className="text-grey-600">$18.99/yr</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-grey-200">
                                <p className="font-bold text-lg">.io</p><p className="text-grey-600">$49.99/yr</p>
                            </div>
                        </div>
                         <div className="text-center mt-8 text-grey-600 max-w-2xl mx-auto">
                            <h4 className="font-bold text-grey-900 mb-2">Premium Domains</h4>
                            <p>Looking for a specific, high-value domain? We facilitate the acquisition of aftermarket domains. These are typically short, memorable, and highly brandable names that have been previously registered. Contact us for inquiries.</p>
                        </div>
                    </div>
                </section>
                
                {/* Section B: Web Template Pricing */}
                <section className="py-16 md:py-24 bg-bg-secondary">
                     <div className="container mx-auto px-6 lg:px-[8vw]">
                         <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Transparent, One-Time Pricing</h2>
                            <p className="text-lg text-grey-600 mt-4 mb-12">
                               No subscriptions. No hidden fees. Pay once, own it forever.
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            {/* Desktop Table */}
                            <div className="hidden md:block bg-white rounded-lg shadow-xl overflow-hidden border border-grey-200">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-6 font-bold text-grey-900 text-lg w-2/5">Feature &amp; Details</th>
                                            <th className="p-6 font-bold text-grey-900 text-lg text-center">Regular License</th>
                                            <th className="p-6 font-bold text-grey-900 text-lg text-center bg-brand-100">Extended License</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {pricingData.map((item, index) => {
                                            if (item.type === 'header') {
                                                return (
                                                    <tr key={index} className="bg-gray-100 border-t border-b border-grey-200">
                                                        <td colSpan={3} className="px-6 py-3 font-semibold text-grey-600 tracking-wider uppercase text-sm text-left">{item.title}</td>
                                                    </tr>
                                                )
                                            }
                                            return (
                                                <tr key={index} className="border-t border-grey-200">
                                                    <td className={`p-6 text-grey-900 text-left ${item.bold ? 'font-semibold' : ''}`}>{item.feature}</td>
                                                    <td className="p-6"><div className="flex justify-center"><FeatureCell value={item.regular} bold={item.bold} /></div></td>
                                                    <td className="p-6 bg-brand-100"><div className="flex justify-center"><FeatureCell value={item.extended} bold={item.bold} isExtended /></div></td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="border-t border-grey-200 bg-gray-50">
                                            <td className="p-6"></td>
                                            <td className="p-6 text-center">
                                                <Link to="/catalog" className="inline-block bg-white border-2 border-primary text-primary py-3 px-8 rounded-lg font-semibold hover:bg-brand-100 transition-colors duration-300">Browse Catalog</Link>
                                            </td>
                                            <td className="p-6 text-center bg-brand-100">
                                                <Link to="/contact" className="inline-block bg-primary text-button-primary-text py-3 px-8 rounded-lg font-semibold hover:bg-primary-hover transition-colors duration-300">Contact Sales</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="block md:hidden space-y-8">
                                {/* Regular License Card */}
                                <div className="bg-white rounded-lg shadow-xl border border-grey-200 overflow-hidden">
                                    <div className="p-6 bg-gray-50">
                                        <h3 className="font-bold text-xl text-center text-grey-900">Regular License</h3>
                                    </div>
                                    <div className="p-6 divide-y divide-grey-200">
                                        {pricingData.map((item, index) => {
                                            if (item.type === 'header') {
                                                return <div key={index} className="pt-5 pb-2 font-semibold text-grey-600 tracking-wider uppercase text-sm text-center">{item.title}</div>
                                            }
                                            return (
                                                <div key={index} className="flex justify-between items-center py-4">
                                                    <span className={`text-grey-900 ${item.bold ? 'font-semibold' : ''}`}>{item.feature}</span>
                                                    <FeatureCell value={item.regular} bold={item.bold} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="p-6 bg-gray-50 text-center">
                                        <Link to="/catalog" className="w-full block bg-white border-2 border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-brand-100 transition-colors">Browse Catalog</Link>
                                    </div>
                                </div>

                                {/* Extended License Card */}
                                 <div className="bg-white rounded-lg shadow-2xl border-2 border-brand-700 overflow-hidden">
                                    <div className="p-6 bg-brand-100">
                                        <h3 className="font-bold text-xl text-center text-brand-900">Extended License</h3>
                                    </div>
                                    <div className="p-6 divide-y divide-grey-200">
                                    {pricingData.map((item, index) => {
                                            if (item.type === 'header') {
                                                return <div key={index} className="pt-5 pb-2 font-semibold text-grey-600 tracking-wider uppercase text-sm text-center">{item.title}</div>
                                            }
                                            return (
                                                <div key={index} className="flex justify-between items-center py-4">
                                                    <span className={`text-grey-900 ${item.bold ? 'font-semibold' : ''}`}>{item.feature}</span>
                                                    <FeatureCell value={item.extended} bold={item.bold} isExtended />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="p-6 bg-brand-100 text-center">
                                        <Link to="/contact" className="w-full block bg-primary text-button-primary-text py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Contact Sales</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-sm text-grey-600 mt-8 max-w-4xl mx-auto">
                           *An "End Product for Sale" can be a SaaS application, a website builder, or any other product where end-users pay a fee to use it.
                        </p>
                    </div>
                </section>
                
                {/* Section C: FAQ */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h3 className="text-3xl font-bold text-center mb-12 font-poppins">Your Questions, Answered</h3>
                        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-grey-200">
                            {PRICING_FAQ_ITEMS.map((item) => (
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