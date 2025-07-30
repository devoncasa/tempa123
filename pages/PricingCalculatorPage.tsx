
import React, { useState, useMemo, useCallback } from 'react';
import { TemplateCategory } from '../types';

const categoryPriceRanges: Record<TemplateCategory, [number, number]> = {
  [TemplateCategory.JEWELRY]: [49, 129],
  [TemplateCategory.FOOD]: [39, 99],
  [TemplateCategory.WELLNESS]: [49, 119],
  [TemplateCategory.PORTFOLIO]: [29, 69],
  [TemplateCategory.COACHES]: [39, 99],
  [TemplateCategory.ARTISAN]: [39, 89],
  [TemplateCategory.ECOMMERCE]: [59, 159],
  [TemplateCategory.REAL_ESTATE]: [69, 179],
  [TemplateCategory.EVENTS]: [49, 119],
  [TemplateCategory.TECH]: [39, 99],
  [TemplateCategory.EDUCATION]: [49, 129],
  [TemplateCategory.NON_PROFIT]: [29, 89],
  [TemplateCategory.FITNESS]: [39, 99],
  [TemplateCategory.TRAVEL]: [49, 119],
  [TemplateCategory.AGENCY]: [49, 139],
  [TemplateCategory.PHOTOGRAPHY]: [39, 99],
  [TemplateCategory.HOME_SERVICES]: [39, 89],
  [TemplateCategory.AUTOMOTIVE]: [49, 109],
  [TemplateCategory.FASHION]: [49, 129],
  [TemplateCategory.BEAUTY]: [49, 119],
  [TemplateCategory.LEGAL]: [59, 149],
  [TemplateCategory.FINANCE]: [59, 159],
  [TemplateCategory.CONSTRUCTION]: [49, 119],
  [TemplateCategory.ENTERTAINMENT]: [39, 99],
  [TemplateCategory.MUSIC]: [39, 89],
  [TemplateCategory.PET_CARE]: [39, 89],
  [TemplateCategory.MARKETING]: [49, 139],
  [TemplateCategory.BLOG]: [29, 79],
  [TemplateCategory.MEDICAL]: [59, 149],
  [TemplateCategory.CHILDCARE]: [39, 99],
};

const PricingCalculatorPage: React.FC = () => {
  const [category, setCategory] = useState<TemplateCategory>(TemplateCategory.JEWELRY);
  const [complexity, setComplexity] = useState<number>(2); // 1-3
  const [isElegant, setIsElegant] = useState<boolean>(false);
  const [salesCount, setSalesCount] = useState<number>(0);

  const basePriceChosen = useMemo(() => {
    const [min, max] = categoryPriceRanges[category];
    if (complexity === 1) return min;
    if (complexity === 3) return max;
    // For complexity 2, return the midpoint
    return Math.round(min + (max - min) / 2);
  }, [category, complexity]);

  const eleganceAdjustment = useMemo(() => {
    return isElegant ? basePriceChosen * 0.10 : 0;
  }, [basePriceChosen, isElegant]);

  const initialPrice = useMemo(() => {
    return basePriceChosen + eleganceAdjustment;
  }, [basePriceChosen, eleganceAdjustment]);

  const finalPrice = useMemo(() => {
    const priceIncreases = Math.floor(salesCount / 100);
    return initialPrice * Math.pow(1.05, priceIncreases);
  }, [initialPrice, salesCount]);

  const handleSalesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSalesCount(isNaN(value) || value < 0 ? 0 : value);
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary font-poppins mb-4">
          Template Pricing Calculator
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Use this tool to determine the optimal price for new templates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Input Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold font-poppins mb-4">Template Details</h2>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value as TemplateCategory)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                {Object.values(TemplateCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
              <div className="flex justify-between items-center bg-gray-100 rounded-md p-1">
                {[1, 2, 3].map(level => (
                  <button key={level} onClick={() => setComplexity(level)} className={`w-1/3 py-2 text-center rounded-md transition-colors ${complexity === level ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                    {level === 1 ? 'Low' : level === 2 ? 'Mid' : 'High'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input id="elegance" type="checkbox" checked={isElegant} onChange={e => setIsElegant(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded" />
              <label htmlFor="elegance" className="ml-2 block text-sm text-gray-900">Elegant Design (+10%)</label>
            </div>
            
            <div>
              <label htmlFor="salesCount" className="block text-sm font-medium text-gray-700 mb-1">Current Sales Count</label>
              <input type="number" id="salesCount" value={salesCount} onChange={handleSalesChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm" min="0" />
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary/5 p-8 rounded-lg shadow-lg sticky top-24">
             <h2 className="text-2xl font-bold font-poppins text-primary mb-6">Pricing Recommendation</h2>
             <div className="space-y-4 text-lg">
                <div className="flex justify-between"><span>Base Price:</span> <span className="font-semibold">${basePriceChosen.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Elegance Adj:</span> <span className="font-semibold">+ ${eleganceAdjustment.toFixed(2)}</span></div>
                 <hr/>
                <div className="flex justify-between font-bold"><span>Initial Price:</span> <span>${initialPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Sales Increases:</span> <span className="font-semibold">{Math.floor(salesCount / 100)} x 5%</span></div>
                 <hr/>
                 <div className="mt-4 pt-4 border-t-2 border-primary/20">
                    <div className="flex justify-between items-center text-2xl font-bold text-secondary">
                        <span>Final Price:</span>
                        <span>${finalPrice.toFixed(2)}</span>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculatorPage;
