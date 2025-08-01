
import React, { useEffect } from 'react';

interface PricingExplainedPopupProps {
    onClose: () => void;
}

const PackageExplanationCard: React.FC<{
    title: string;
    price: string;
    whoFor: string;
    whatFor: string;
}> = ({ title, price, whoFor, whatFor }) => (
    <div className="bg-white p-6 rounded-lg border border-grey-200 shadow-sm mb-6">
        <h3 className="text-xl font-bold font-poppins text-brand-700">{title} ({price})</h3>
        <div className="mt-4">
            <h4 className="font-semibold text-grey-900">Who is this for?</h4>
            <p className="text-grey-600">{whoFor}</p>
        </div>
        <div className="mt-4">
            <h4 className="font-semibold text-grey-900">What are you paying for?</h4>
            <p className="text-grey-600">{whatFor}</p>
        </div>
    </div>
);

const PricingExplainedPopup: React.FC<PricingExplainedPopupProps> = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1001] p-4 animate-fade-in-fast"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-explained-title"
            onClick={onClose}
        >
            <style>{`
                @keyframes fade-in-fast {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-fast {
                    animation: fade-in-fast 0.3s ease-out forwards;
                }
            `}</style>
            <div 
                className="bg-bg-secondary w-full max-w-4xl h-[90vh] rounded-2xl flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-grey-200 sticky top-0 bg-bg-secondary z-10">
                    <h1 id="pricing-explained-title" className="text-3xl font-bold font-poppins text-grey-900 text-center">Finding the Perfect Fit: A Guide to Our Service Pricing</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-poppins font-bold text-text-primary mb-3">Our Philosophy: Why We Have Different Packages</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Every business is unique. A local café has different needs than a growing e-commerce store. Our pricing is designed to provide exactly what you need, without making you pay for features you don't. This guide will help you understand the value in each package so you can make the best choice for your business.
                        </p>
                    </section>
                    
                    <section className="bg-white p-6 rounded-lg border border-grey-200">
                        <h2 className="text-2xl font-poppins font-bold text-text-primary mb-3">The Core Choice: DIY vs. "Done For You"</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg text-brand-700">Path A: Buy a Template Only (DIY)</h3>
                                <p className="text-text-secondary mt-1">This is for you if you have the time and technical skill (or a developer) to build your site yourself. You get the raw materials.</p>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg text-brand-700">Path B: Buy a Template + Service ("Done For You")</h3>
                                <p className="text-text-secondary mt-1">This is for you if you are a busy business owner who wants a guaranteed, professional result without touching any code. You get the finished product.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-poppins font-bold text-text-primary mb-4">A Breakdown of Our "Done For You" Packages</h2>
                        <p className="text-text-secondary leading-relaxed mb-6">
                            Our packages are a 'value ladder.' Each step up includes everything from the previous tier, plus more value. Here’s who each package is designed for and why it costs what it does.
                        </p>
                        
                        <PackageExplanationCard 
                            title="Brand Identity Setup"
                            price="2,999 THB"
                            whoFor="The DIYer who just needs a professional starting push."
                            whatFor="A few hours of a developer's time to handle the initial, sometimes tricky, setup of your logo, brand colors, and contact info, ensuring it looks perfect from day one."
                        />
                        <PackageExplanationCard 
                            title="Launchpad Package"
                            price="7,499 THB"
                            whoFor="A business needing a standard, professional 'brochure' website (e.g., a consultant, a small service business)."
                            whatFor="The developer's time to build out your core pages (up to 5). This is the foundational work of taking your raw text and images and structuring them into a complete, navigable website."
                        />
                        <PackageExplanationCard 
                            title="Content Pro Package"
                            price="14,999 THB"
                            whoFor="A business that wants a truly professional voice and to save time on writing."
                            whatFor="This includes all the developer work from the Launchpad package, PLUS the cost of a professional copywriter to write engaging, SEO-friendly text for your site. You're paying for a creative skill that elevates your brand message."
                        />
                        <PackageExplanationCard 
                            title="E-commerce Starter"
                            price="15,999 THB"
                            whoFor="A small shop owner ready to start selling their first few products online."
                            whatFor="This includes the developer's work to set up the core website, PLUS the technical work of configuring e-commerce functionality (cart, checkout) and the meticulous data entry for your first 10 products."
                        />
                        <PackageExplanationCard 
                            title="E-commerce Pro"
                            price="24,999 THB"
                            whoFor="A growing business with a larger, more complex product catalog."
                            whatFor="A significant block of developer and data entry time. This covers the setup of a more extensive store (up to 10 pages) and the detailed work of adding up to 25 complex products with variations (e.g., size, color), which is a time-intensive process."
                        />
                         <PackageExplanationCard 
                            title="Bespoke Partnership"
                            price="Starts at 35,000 THB"
                            whoFor="Established businesses with unique needs that don't fit a standard package."
                            whatFor="This is not a package; it's a project. The starting price secures a dedicated block of our senior developer and strategist's time for a deep-dive consultation, project planning, custom feature development, and a dedicated project manager."
                        />
                    </section>
                </main>
                
                <footer className="p-6 border-t border-grey-200 text-center sticky bottom-0 bg-bg-secondary z-10">
                    <button onClick={onClose} className="btn btn-primary-gradient px-12 py-3">
                        I Understand, Close This Guide
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PricingExplainedPopup;
