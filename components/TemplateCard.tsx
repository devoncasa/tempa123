import React from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../types';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="bg-bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-border-primary hover:border-primary">
      <div className="relative">
        <img src={template.imageUrl} alt={template.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <p className="text-white text-xl font-bold font-poppins">{template.name}</p>
        </div>
        <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{template.category}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-poppins text-text-primary mb-2">{template.name}</h3>
        <p className="text-text-secondary mb-4 h-12 overflow-hidden">{template.tagline}</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link to={`/template/${template.id}`} className="flex-1 btn btn-secondary-outline">
            View Demo
          </Link>
          <button className="flex-1 btn btn-primary-gradient">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;