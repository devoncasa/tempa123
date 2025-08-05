import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_MAP } from '../src/siteMap';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[60vh]">
      <h1 className="text-6xl font-bold text-brand-700 font-poppins">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-grey-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to={SITE_MAP.HOME} 
        className="bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-primary-hover transition-colors duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;