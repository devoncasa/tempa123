import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TEMPLATES } from '../../constants';
import Seo from '../../components/Seo';
import { SITE_MAP } from '../siteMap';
import { SEO_CONTENT } from '../content';

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const template = TEMPLATES.find(t => t.id === id);

  return (
    <>
      <Seo
        title={SEO_CONTENT.CHECKOUT.title}
        description={SEO_CONTENT.CHECKOUT.description}
      />
      <div className="flex flex-col items-center justify-center text-center h-[60vh]">
        <h1 className="text-4xl font-bold text-brand-700 font-poppins">Checkout</h1>
        <p className="text-grey-600 my-4">This feature is coming soon!</p>
        {template && (
          <p className="text-lg mb-8">You are about to purchase: <strong>{template.name}</strong></p>
        )}
        <Link 
          to={SITE_MAP.CATALOG} 
          className="bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-primary-hover transition-colors duration-300"
        >
          Back to Catalog
        </Link>
      </div>
    </>
  );
};

export default CheckoutPage;