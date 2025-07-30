
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyles = "text-base-text hover:text-primary transition-colors duration-300 font-medium";
  const activeLinkStyles = { color: '#009CA7' };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-poppins text-primary">
          Tempa123
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Home</NavLink>
          <NavLink to="/catalog" className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Catalog</NavLink>
          <NavLink to="/submit-template" className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Submit Template</NavLink>
          <NavLink to="/pricing-calculator" className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Pricing Tool</NavLink>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-base-text focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
             <NavLink to="/" onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Home</NavLink>
             <NavLink to="/catalog" onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Catalog</NavLink>
             <NavLink to="/submit-template" onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Submit Template</NavLink>
             <NavLink to="/pricing-calculator" onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? linkStyles + " text-primary" : linkStyles}>Pricing Tool</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
