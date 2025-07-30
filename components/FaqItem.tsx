
import React, { useState } from 'react';
import type { FaqItem as FaqItemType } from '../types';

interface FaqItemProps {
  item: FaqItemType;
}

const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-grey-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h4 className="text-lg font-semibold font-poppins text-grey-900">{item.question}</h4>
        <svg
          className={`w-6 h-6 text-brand-700 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-grey-600">{item.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;