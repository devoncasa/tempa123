
import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 lg:px-[8vw] py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-poppins mb-4">
          Our Blog & Resources
        </h1>
        <p className="text-lg text-grey-600 mb-12">
          Design trends, creator spotlights, and tips for making the most of your template.
        </p>

        <div className="bg-white p-10 rounded-lg shadow-lg text-center border border-grey-200">
            <h2 className="text-2xl font-poppins font-bold text-grey-900">Coming Soon!</h2>
            <p className="text-grey-600 mt-4 mb-8">
                We're currently curating our first batch of articles. Stay tuned for insightful content that will help you succeed.
            </p>
            <Link to="/catalog" className="bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-primary-hover transition-all duration-300">
                Explore Templates
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;