
import React, { useState, useMemo } from 'react';
import Seo from '../components/Seo';
import { TEMPLATES, CALCULATOR_PACKAGES, CALCULATOR_ADDONS, getSingleTemplatePriceThb } from '../constants';
import { Template, CalculatorPackage, CalculatorAddon } from '../types';

const SearchIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PlusIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const MinusIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
};

const PricingCalculatorPage: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<CalculatorPackage | null>(CALCULATOR_PACKAGES[0]);
    const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: number }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = useMemo(() => {
        if (!searchQuery) return TEMPLATES;
        return TEMPLATES.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    const handleSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = TEMPLATES.find(t => t.id === e.target.value) || null;
        setSelectedTemplate(template);
    };

    const handleSelectPackage = (pkg: CalculatorPackage) => {
        setSelectedPackage(pkg);
        // Reset addons when package changes
        setSelectedAddons({});
    };

    const handleAddonToggle = (addon: CalculatorAddon, isChecked: boolean) => {
        setSelectedAddons(prev => {
            const newAddons = { ...prev };
            if (isChecked) {
                newAddons[addon.id] = 1;
            } else {
                delete newAddons[addon.id];
            }
            return newAddons;
        });
    };

    const handleAddonQuantityChange = (addonId: string, change: number) => {
        setSelectedAddons(prev => {
            const currentQuantity = prev[addonId] || 0;
            const newQuantity = Math.max(0, currentQuantity + change);
            if (newQuantity === 0) {
                const newAddons = { ...prev };
                delete newAddons[addonId];
                return newAddons;
            }
            return { ...prev, [addonId]: newQuantity };
        });
    };

    const { templatePrice, packagePrice, addonsPrice, totalPrice } = useMemo(() => {
        const templatePrice = selectedTemplate ? getSingleTemplatePriceThb(selectedTemplate) : 0;
        const packagePrice = selectedPackage ? selectedPackage.price_thb : 0;
        let addonsPrice = 0;
        for (const addonId in selectedAddons) {
            const addon = CALCULATOR_ADDONS.find(a => a.id === addonId);
            if (addon) {
                addonsPrice += addon.price_thb * selectedAddons[addonId];
            }
        }
        const totalPrice = templatePrice + packagePrice + addonsPrice;
        return { templatePrice, packagePrice, addonsPrice, totalPrice };
    }, [selectedTemplate, selectedPackage, selectedAddons]);

    const availableAddons = useMemo(() => {
        if (!selectedPackage) return [];
        return CALCULATOR_ADDONS.filter(addon => selectedPackage.addonIds.includes(addon.id));
    }, [selectedPackage]);

    return (
        <>
            <Seo
                title="Pricing Calculator | Tempa Web.123"
                description="Get an instant estimate for your website project. Combine templates and service packages to see your total cost."
            />
            <div className="bg-bg-secondary py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">Project Cost Calculator</h1>
                        <p className="text-lg text-text-secondary mt-4">
                            Build your perfect package and get an instant cost estimate for your new website.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Left Side: Controls */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Step 1: Template */}
                            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-2xl font-bold font-poppins mb-1">Step 1: Choose Your Template</h2>
                                <p className="text-text-secondary mb-4">Select a design to start with. Price is for a single-use license.</p>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search for a template..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-gray-50"
                                            aria-label="Search templates"
                                        />
                                    </div>
                                    <select
                                        value={selectedTemplate?.id || ''}
                                        onChange={handleSelectTemplate}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-gray-50"
                                        aria-label="Select template"
                                    >
                                        <option value="">-- Select a Template --</option>
                                        {filteredTemplates.length > 0 ? (
                                            filteredTemplates.map(t => (
                                                <option key={t.id} value={t.id}>
                                                    {t.name} ({t.category})
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No templates found for "{searchQuery}"</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            {/* Step 2: Service Package */}
                            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-2xl font-bold font-poppins mb-1">Step 2: Choose a Service Package</h2>
                                <p className="text-text-secondary mb-4">Let us handle the heavy lifting. All packages include a free template.</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {CALCULATOR_PACKAGES.map(pkg => (
                                        <div key={pkg.id} onClick={() => handleSelectPackage(pkg)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedPackage?.id === pkg.id ? 'border-primary bg-brand-50 shadow-md' : 'border-gray-200 hover:border-primary/50'}`}>
                                            <h3 className="font-bold font-poppins">{pkg.name}</h3>
                                            <p className="text-sm text-text-secondary">{pkg.description}</p>
                                            <p className="text-xl font-bold text-brand-700 mt-2">{formatCurrency(pkg.price_thb)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Add-ons */}
                            {selectedPackage && availableAddons.length > 0 && (
                                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                                    <h2 className="text-2xl font-bold font-poppins mb-1">Step 3: Select Add-ons</h2>
                                    <p className="text-text-secondary mb-4">Enhance your package with optional extras.</p>
                                    <div className="space-y-4">
                                        {availableAddons.map(addon => (
                                            <div key={addon.id} className="bg-bg-secondary p-4 rounded-lg flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{addon.name}</h4>
                                                    <p className="text-sm text-text-secondary">{addon.description}</p>
                                                </div>
                                                {addon.isCountable ? (
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => handleAddonQuantityChange(addon.id, -1)} className="p-1 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800" aria-label={`Decrease quantity of ${addon.name}`}><MinusIcon /></button>
                                                        <span className="font-bold w-6 text-center" aria-live="polite">{selectedAddons[addon.id] || 0}</span>
                                                        <button onClick={() => handleAddonQuantityChange(addon.id, 1)} className="p-1 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800" aria-label={`Increase quantity of ${addon.name}`}><PlusIcon /></button>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        id={`addon-${addon.id}`}
                                                        checked={!!selectedAddons[addon.id]}
                                                        onChange={(e) => handleAddonToggle(addon, e.target.checked)}
                                                        className="h-6 w-6 rounded text-primary focus:ring-primary"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-28 bg-white p-8 rounded-xl shadow-lg border-2 border-primary">
                                <h2 className="text-2xl font-bold font-poppins text-center mb-6">Your Project Estimate</h2>
                                <div className="space-y-3 text-sm text-text-secondary border-b pb-4 mb-4">
                                    <div className="flex justify-between"><span>Template License</span> <span className="font-mono">{formatCurrency(templatePrice)}</span></div>
                                    <div className="flex justify-between"><span>Service Package</span> <span className="font-mono">{formatCurrency(packagePrice)}</span></div>
                                    <div className="flex justify-between"><span>Add-ons</span> <span className="font-mono">{formatCurrency(addonsPrice)}</span></div>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold font-poppins mb-6">
                                    <span>Subtotal</span>
                                    <span className="font-mono text-3xl">{formatCurrency(totalPrice)}</span>
                                </div>
                                <p className="text-xs text-center text-gray-500 mb-6">Total does not include 7% VAT. This is an estimate, and final pricing may vary.</p>
                                <button className="w-full btn btn-primary-gradient">
                                    Contact Us to Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingCalculatorPage;
