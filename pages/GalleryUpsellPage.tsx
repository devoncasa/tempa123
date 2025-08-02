import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const GalleryUpsellPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Access the Inspiration Gallery | Tempa Web.123"
        description="Upgrade your plan to get access to thousands of professional, high-quality images to make your website stunning."
      />
      <div className="py-16 md:py-24 bg-bg-secondary">
        <div className="container mx-auto px-6 lg:px-[8vw]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-brand-200 text-brand-700 p-4 rounded-full mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">
              Unlock Your Creative Potential
            </h1>
            <p className="text-xl text-text-secondary mt-4">
              The Inspiration Gallery is a premium resource available with our customization packages.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-xl my-12 border border-border-primary">
                <h2 className="text-2xl font-bold font-poppins mb-4">What You're Missing</h2>
                <ul className="text-left max-w-md mx-auto space-y-3 text-text-secondary">
                    <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                        <span>Access to thousands of high-resolution, professional stock photos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.53 0 1.04.21 1.41.59L15 5h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h3l1.59-1.59A2 2 0 0112 3z" /></svg>
                        <span>Images curated for every business category, ready to use.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span>Save time and money by finding the perfect visuals right here.</span>
                    </li>
                </ul>
            </div>
            <Link 
              to="/pricing/customization-services"
              className="btn btn-primary-gradient text-lg px-10 py-4"
            >
              Upgrade Now to Access
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryUpsellPage;
