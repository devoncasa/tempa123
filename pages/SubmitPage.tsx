import React from 'react';
import BrandName from '../components/BrandName';
import Seo from '../components/Seo';
import { SEO_CONTENT } from '../src/content';

const SubmitPage: React.FC = () => {
  return (
    <>
      <Seo
        title={SEO_CONTENT.SUBMIT_TEMPLATE.title}
        description={SEO_CONTENT.SUBMIT_TEMPLATE.description}
      />
      <section className="bg-bg-section-dark py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-[8vw]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-900 font-poppins mb-4">
              Submit Your Template to <BrandName />
            </h1>
            <p className="text-center text-lg text-grey-600 mb-12">
              Join our marketplace and sell your creations to a global audience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-900">
                <h2 className="text-2xl font-bold font-poppins mb-4">Submission Instructions</h2>
                <ol className="list-decimal list-inside space-y-3 text-grey-600">
                  <li>Ensure your template is fully responsive and mobile-friendly.</li>
                  <li>Provide a public URL for a live demo (e.g., Netlify, Vercel).</li>
                  <li>Package all template files into a single .zip archive.</li>
                  <li>Upload the .zip file to a cloud service (Google Drive, Dropbox) and create a shareable link.</li>
                  <li>Prepare high-quality screenshots (1200x800px) and a detailed description.</li>
                  <li>Fill out the submission form with all the required information.</li>
                </ol>
                <p className="mt-6 text-sm text-grey-600">
                  Our team will review your submission within 5-7 business days. For questions, please contact us at <a href="mailto:info@tempa123.com" className="text-brand-700 hover:underline">info@tempa123.com</a>.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-900">
                <h2 className="text-2xl font-bold font-poppins mb-4">Submission Form</h2>
                <div className="bg-gray-100 border-2 border-dashed border-grey-200 rounded-lg p-8 text-center">
                  <p className="text-grey-900 font-semibold">Embedded Google Form</p>
                  <p className="text-grey-600 mt-2">
                    A Google Form for template submissions would be embedded here, containing fields for:
                  </p>
                  <ul className="text-sm text-left list-disc list-inside mt-4 text-grey-600">
                    <li>Name & Email</li>
                    <li>Template Name & Category</li>
                    <li>Public Demo URL</li>
                    <li>Template File Link</li>
                    <li>Screenshot Links</li>
                    <li>Description & Instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubmitPage;