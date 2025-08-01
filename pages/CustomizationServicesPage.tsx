
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PricingExplainedPopup from '../components/PricingExplainedPopup';
import { servicePackages } from '../constants';
import { ServicePackage } from '../types';

const SetupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l1.414-1.414a1 1 0 011.414 0l1.414 1.414M2.25 12h19.5" />
    </svg>
);

const PricingDetailModal: React.FC<{ pkg: ServicePackage; onClose: () => void }> = ({ pkg, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <h2 id="modal-title" className="text-2xl font-bold font-poppins text-grey-900">{pkg.modal.title}</h2>
                    <button onClick={onClose} className="text-grey-600 hover:text-grey-900" aria-label="Close pricing details">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="mt-6 border-t pt-6">
                    <h3 className="font-bold text-lg text-grey-900 mb-4">{pkg.modal.basePriceText}</h3>
                    
                    {pkg.modal.customText ? (
                        <div className="text-grey-600 leading-relaxed space-y-1">
                            {pkg.modal.customText.split('\n').map((line, i) => {
                                if (line.trim() === '') return <div key={i} className="h-3" />; // paragraph spacing

                                // **Heading**
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return <h4 key={i} className="font-bold text-lg text-grey-900 mt-4 mb-2">{line.substring(2, line.length - 2)}</h4>;
                                }

                                // ✅ Main list item
                                if (line.trim().startsWith('✅')) {
                                    return (
                                        <div key={i} className="flex items-start gap-3 mt-2">
                                            <span className="text-green-500 text-xl flex-shrink-0">✅</span>
                                            <span>{line.trim().substring(1).trim()}</span>
                                        </div>
                                    );
                                }

                                // - Sub-list item
                                if (line.trim().startsWith('-')) {
                                    return (
                                        <div key={i} className="flex items-start gap-3 ml-10">
                                            <span className="text-brand-700 text-lg flex-shrink-0 mt-1">&bull;</span>
                                            <span className="text-sm">{line.trim().substring(1).trim()}</span>
                                        </div>
                                    );
                                }

                                // Plain paragraph
                                return <p key={i}>{line}</p>;
                            })}
                        </div>
                    ) : (
                        <ul className="space-y-3 mb-8">
                            {pkg.modal.included.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-grey-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {pkg.modal.addons.length > 0 && (
                        <>
                            <h3 className="font-bold text-lg text-grey-900 mb-4 mt-8 pt-4 border-t">Popular Add-ons</h3>
                            <div className="space-y-4">
                                {pkg.modal.addons.map(addon => (
                                    <div key={addon.name} className="flex justify-between items-start gap-4 p-4 bg-bg-secondary rounded-lg">
                                        <p className="text-grey-600 flex-1">{addon.name}</p>
                                        <p className="font-bold text-brand-700 whitespace-nowrap">{addon.price}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <p className="text-xs text-grey-600 mt-6">All prices exclude 7% VAT.</p>
                </div>

                <div className="mt-8 text-right">
                    <button onClick={onClose} className="bg-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const ServicePackageCard: React.FC<{ pkg: ServicePackage; onDetailsClick: (pkg: ServicePackage) => void }> = ({ pkg, onDetailsClick }) => {
    const isCustom = pkg.isCustom;
    const cardClasses = `rounded-lg shadow-lg border flex flex-col ${isCustom ? 'bg-brand-50 border-brand-500 border-2' : 'bg-white border-grey-200'}`;
    
    return (
        <div className={cardClasses}>
            {isCustom && <div className="bg-brand-500 text-white text-center text-sm font-bold py-1 rounded-t-md">MOST FLEXIBLE</div>}
            <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold font-poppins text-grey-900">{pkg.name}</h3>
                <div className="my-4">
                    <p className="text-grey-600 text-sm">{isCustom ? 'Starts at' : 'One-Time Fee'}</p>
                    <p className="text-4xl font-bold font-poppins text-brand-700">{new Intl.NumberFormat().format(pkg.price_thb)} THB</p>
                    <p className="text-grey-600">~${new Intl.NumberFormat().format(pkg.price_usd_approx)} USD</p>
                </div>
                <button 
                    onClick={() => onDetailsClick(pkg)} 
                    className="text-brand-700 font-semibold hover:underline"
                >
                    [See Pricing Details]
                </button>
                <ul className="space-y-2 mt-6 text-sm">
                    {pkg.keyFeatures.map(feature => (
                        <li key={feature} className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span className="text-grey-600">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-6 bg-grey-200/30 rounded-b-lg">
                <Link 
                    to={isCustom ? "/contact" : "#"} 
                    className="block w-full text-center bg-primary text-white py-3 px-6 rounded-lg font-semibold tracking-wide-sm hover:bg-primary-dark transition-colors duration-300"
                >
                    {isCustom ? 'Get a Custom Quote' : 'Get Started'}
                </Link>
            </div>
        </div>
    );
};

const CustomizationServicesPage: React.FC = () => {
    const [activeModalPackage, setActiveModalPackage] = useState<ServicePackage | null>(null);
    const [isExplainedPopupOpen, setIsExplainedPopupOpen] = useState(false);

    const servicesSchema = {
        "@context": "https://schema.org",
        "@graph": servicePackages.map(pkg => ({
            "@type": "Service",
            "serviceType": "Website Customization",
            "provider": {
                "@type": "Organization",
                "name": "Tempa Web.123"
            },
            "name": pkg.name,
            "description": pkg.description,
            "offers": {
                "@type": "Offer",
                "price": pkg.price_thb,
                "priceCurrency": "THB"
            }
        }))
    };

    return (
        <>
            <Seo
                title="Professional Setup & Customization Services | Tempa Web.123"
                description="Short on time or technical skills? Let our expert team build your website for you with our professional customization packages."
                schema={servicesSchema}
            />
            <div className="bg-bg-primary">
                {/* Section 1: Hero */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold font-poppins text-grey-900 leading-tight">Professional Setup & Customization Services</h1>
                                <p className="text-lg text-grey-600 mt-6 leading-relaxed">
                                    Love your new template but short on time? Let our expert team build your website for you. We'll handle the technical details so you can focus on running your business.
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="bg-brand-50 p-8 rounded-full">
                                    <SetupIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Service Packages Grid */}
                <section className="py-16 md:py-24 bg-bg-secondary">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                         <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900">Our Service Packages</h2>
                            <p className="text-lg text-grey-600 mt-4 mb-6">
                               Choose a package that fits your needs. All prices are a one-time fee and do not include the cost of the template itself.
                            </p>
                            <div className="mb-12">
                                <button
                                    onClick={() => setIsExplainedPopupOpen(true)}
                                    className="text-brand-700 font-semibold hover:underline bg-brand-50 px-6 py-3 rounded-full border border-brand-200 transition-all hover:bg-brand-100"
                                >
                                    🤔 Confused about which package is right for you? Click here for a detailed guide.
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {servicePackages.map(pkg => (
                                <ServicePackageCard key={pkg.id} pkg={pkg} onDetailsClick={setActiveModalPackage} />
                            ))}
                        </div>
                        <p className="text-center text-xs text-grey-600 mt-8">All prices exclude 7% VAT.</p>
                    </div>
                </section>

                {/* Section 3: Multilingual Services CTA */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-grey-200 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0 bg-brand-50 p-6 rounded-full">
                                <GlobeIcon />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold font-poppins text-grey-900">Need to Reach a Global Audience?</h2>
                                <p className="text-grey-600 mt-2 mb-4">
                                    Expand your business with our professional multilingual website services. We handle the technical setup and professional translation to get you in front of new markets.
                                </p>
                                <Link 
                                    to="/services/multilingual-websites" 
                                    className="inline-block font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                                >
                                    Learn More About Multilingual Services &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {activeModalPackage && <PricingDetailModal pkg={activeModalPackage} onClose={() => setActiveModalPackage(null)} />}
            {isExplainedPopupOpen && <PricingExplainedPopup onClose={() => setIsExplainedPopupOpen(false)} />}
        </>
    );
};

export default CustomizationServicesPage;