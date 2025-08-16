import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEMPLATES, getTemplatePriceUSD } from '../constants';
import NotFoundPage from './NotFoundPage';
import TemplateCard from '../components/TemplateCard';
import type { Template } from '../types';
import Seo from '../components/Seo';
import { SITE_MAP, getCheckoutPath } from '../src/siteMap';

const TemplateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = TEMPLATES.find(t => t.id === id);
  
  const [mainImage, setMainImage] = useState(template?.imageUrl);
  const [activeColorTheme, setActiveColorTheme] = useState(template?.colorThemes[0]);
  const [activeLayoutStyle, setActiveLayoutStyle] = useState(template?.layoutVariations[0]);
  const [activeFontSet, setActiveFontSet] = useState(template?.fontOptions[0]);

  useEffect(() => {
    const newTemplate = TEMPLATES.find(t => t.id === id);
    if (newTemplate) {
        setMainImage(newTemplate.imageUrl);
        setActiveColorTheme(newTemplate.colorThemes[0]);
        setActiveLayoutStyle(newTemplate.layoutVariations[0]);
        setActiveFontSet(newTemplate.fontOptions[0]);
    }
  }, [id]);

  if (!template) {
    return <NotFoundPage />;
  }
  
  const singlePrice = getTemplatePriceUSD(template);
  const extendedPrice = 299; // Based on pricing page
  const relatedTemplates = TEMPLATES.filter(t => t.category === template.category && t.id !== template.id).slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": template.name,
    "image": template.imageUrl,
    "description": template.description,
    "sku": `TW123-${template.id}`,
    "brand": {
      "@type": "Organization",
      "name": "Tempa Web.123"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Regular License",
        "price": singlePrice,
        "priceCurrency": "USD",
        "description": "For use in a single end-product which end users are not charged for.",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Extended License",
        "price": extendedPrice,
        "priceCurrency": "USD",
        "description": "For use in a single end-product which end users can be charged for (e.g. SaaS application).",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <>
      <Seo
        title={`${template.name} | Tempa Web.123`}
        description={template.tagline}
        schema={productSchema}
      />
      <div>
        <section className="bg-bg-section-dark py-12 md:py-20">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-poppins">{template.name}</h1>
              <p className="text-xl text-grey-600 mt-2">{template.tagline}</p>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-4">
                <img src={mainImage} alt={template.name} className="w-full h-auto object-cover rounded-lg shadow-2xl aspect-[3/2]" />
              </div>
              <div className="lg:col-span-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {template.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-28 h-20 lg:w-full lg:h-auto object-cover rounded-md cursor-pointer aspect-[3/2] transition-all duration-300 ${mainImage === img ? 'ring-4 ring-primary' : 'hover:ring-2 ring-primary/50'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-section-light py-12 md:py-20">
          <div className="container mx-auto px-6 lg:px-[8vw]">
            {/* Details & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                 <div>
                  <h2 className="text-3xl font-bold font-poppins mb-4">Description</h2>
                  <p className="text-grey-600 leading-relaxed">{template.description}</p>
                </div>
                 <div>
                  <h3 className="text-2xl font-bold font-poppins mb-4">Style</h3>
                  <p className="text-grey-600 italic bg-brand-100/50 p-4 rounded-md border-l-4 border-brand-500">{template.styleDescription}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-poppins mb-4">Key Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white p-6 rounded-lg shadow-md border border-grey-200">
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-brand-700">Features</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {template.features.map(feature => <li key={feature} className="text-grey-600">{feature}</li>)}
                            <li className="text-grey-600">{template.isDynamic ? 'Dynamic Content & Parallax' : 'Static Build'}</li>
                            <li className="text-grey-600">{template.hasShopPage ? 'E-commerce Ready' : 'Standard Pages'}</li>
                            <li className="text-grey-600">Fully Responsive</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-brand-700">Site Menu Includes</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {template.necessaryMenu.map(item => <li key={item} className="text-grey-600">{item}</li>)}
                        </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-grey-200">
                  <h3 className="text-2xl font-bold font-poppins border-b pb-2 border-grey-200">Customization Options</h3>
                  
                  {/* Color Themes */}
                  <div>
                    <h4 className="text-xl font-semibold font-poppins mb-3">Color Themes</h4>
                    <div className="flex flex-wrap gap-4">
                      {template.colorThemes.map(theme => (
                        <button key={theme.name} onClick={() => setActiveColorTheme(theme)} className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeColorTheme?.name === theme.name ? 'ring-2 ring-primary shadow-lg' : 'ring-1 ring-grey-200 hover:ring-primary/70'}`}>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {theme.palette.slice(0, 4).map(color => <div key={color} style={{backgroundColor: color}} className="w-5 h-5 rounded-full border-2 border-white -ml-1"></div>)}
                            </div>
                            <span className="text-sm font-medium">{theme.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout Variations */}
                   <div>
                    <h4 className="text-xl font-semibold font-poppins mb-3">Layout Variations</h4>
                    <div className="flex flex-wrap gap-3">
                        {template.layoutVariations.map(style => (
                            <button key={style} onClick={() => setActiveLayoutStyle(style)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeLayoutStyle === style ? 'bg-primary text-white' : 'bg-gray-200 text-grey-900 hover:bg-gray-300'}`}>
                                {style}
                            </button>
                        ))}
                    </div>
                  </div>

                   {/* Font Options */}
                   <div>
                    <h4 className="text-xl font-semibold font-poppins mb-3">Font Pairings</h4>
                     <div className="flex flex-wrap gap-3">
                        {template.fontOptions.map(option => (
                            <button key={option.name} onClick={() => setActiveFontSet(option)} className={`px-4 py-2 text-sm rounded-full transition-colors ${activeFontSet?.name === option.name ? 'bg-primary text-white' : 'bg-gray-200 text-grey-900 hover:bg-gray-300'}`}>
                                <span className="font-semibold">{option.fonts[0]}</span> + <span className="italic">{option.fonts[1]}</span>
                            </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-28 border border-grey-200">
                  <h3 className="text-xl font-bold font-poppins text-center mb-6">Get This Template</h3>
                  
                  <div className="space-y-4">
                      <Link to={getCheckoutPath(template.id)} className="block w-full text-center bg-accent text-white py-3 px-6 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:brightness-90 transition-all duration-300 transform hover:scale-105">
                          Buy Single License (${singlePrice})
                      </Link>
                      <Link to={SITE_MAP.PRICING} className="block w-full text-center bg-transparent border-2 border-primary text-primary py-3 px-6 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-brand-100 transition-all duration-300">
                          Access via Membership
                      </Link>
                  </div>
                  <p className="text-center text-xs text-grey-600 mt-4">
                      See our <Link to={SITE_MAP.PRICING} className="underline hover:text-primary">Pricing Page</Link> for details on licenses and membership benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <section className="bg-bg-section-dark py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-[8vw]">
              <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Related Templates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedTemplates.map(t => <TemplateCard key={t.id} template={t} />)}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default TemplateDetailPage;