import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TEMPLATES, getTemplatePriceUSD } from '../../constants';
import Seo from '../../components/Seo';
import { SITE_MAP } from '../siteMap';
import { SEO_CONTENT } from '../content';
import { useLegalModal } from '../../contexts/LegalModalContext';

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = TEMPLATES.find(t => t.id === id);
  const { openModal } = useLegalModal();
  const price = template ? getTemplatePriceUSD(template) : 0;

  return (
    <>
      <Seo
        title={SEO_CONTENT.CHECKOUT.title}
        description={SEO_CONTENT.CHECKOUT.description}
      />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-border-primary">
          <h1 className="text-3xl font-bold text-brand-700 font-poppins text-center">Checkout</h1>
          
          {template ? (
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={template.imageUrl} alt={template.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{template.name}</p>
                    <p className="text-sm text-text-secondary">Single License</p>
                  </div>
                </div>
                <p className="text-xl font-bold font-poppins text-accent">${price}</p>
              </div>
            </div>
          ) : (
             <p className="text-center text-text-secondary mt-4">No template selected.</p>
          )}

          <div className="mt-8 text-center text-gray-500 bg-gray-100 p-4 rounded-md">
              <p>This is a demo. Checkout functionality is not implemented.</p>
          </div>

          <div className="mt-6">
              <label className="flex items-center">
                  <input type="checkbox" className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary" />
                  <span className="ml-3 text-sm text-gray-700">I have read and agree to the 
                      <button onClick={() => openModal('terms')} className="form-link ml-1">Terms & Conditions</button>.
                  </span>
              </label>
          </div>

           <div className="mt-8">
              <button 
                  disabled 
                  className="w-full bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                  Purchase (Disabled)
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;