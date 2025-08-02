
import React from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../types';
import { getTemplatePriceUSD } from '../constants';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const price = getTemplatePriceUSD(template);

  return (
    <>
      <style>{`
        .template-card-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s ease;
          text-align: center;
          border: 2px solid var(--white);
        }
        .template-card-btn.primary {
          background-color: var(--white);
          color: var(--text-primary);
        }
        .template-card-btn.primary:hover {
          background-color: transparent;
          color: var(--white);
        }
        .template-card-btn.secondary {
          background-color: transparent;
          color: var(--white);
        }
        .template-card-btn.secondary:hover {
          background-color: var(--white);
          color: var(--text-primary);
        }
      `}</style>
      <div className="bg-bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 group border border-border-primary flex flex-col hover:shadow-xl hover:-translate-y-1">
        <div className="relative image-container overflow-hidden">
          <img 
            src={template.imageUrl} 
            alt={template.name} 
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Link to={`/template/${template.id}`} className="template-card-btn primary">
                Live Demo
              </Link>
              <Link to={`/template/${template.id}`} className="template-card-btn secondary">
                View Details
              </Link>
            </div>
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold font-poppins text-text-primary">{template.name}</h3>
              <p className="text-sm text-text-secondary">{template.category}</p>
            </div>
            <div className="text-lg font-bold font-poppins text-primary">
              ${price}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateCard;