
import React from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../types';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img src={template.imageUrl} alt={template.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <p className="text-white text-xl font-bold font-poppins">{template.name}</p>
        </div>
        <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">{template.category}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-poppins text-primary mb-2">{template.name}</h3>
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{template.tagline}</p>
        <div className="flex space-x-2">
          <Link to={`/template/${template.id}`} className="flex-1 text-center bg-primary text-white py-2 px-4 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-opacity-90 transition-colors duration-300">
            View Demo
          </Link>
          <button className="flex-1 text-center bg-secondary text-white py-2 px-4 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-opacity-90 transition-colors duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
