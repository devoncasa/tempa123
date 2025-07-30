import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BrandName from './BrandName';

const BrandIdentity: React.FC = () => (
  <Link to="/" className="flex items-center gap-3" aria-label="Tempa Web.123 - Homepage">
    <img 
      src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/refs/heads/main/Tempa%20logo%20small%20fit.webp" 
      alt="Tempa Web.123 Logo" 
      className="h-10 w-auto" 
    />
    <BrandName className="font-poppins font-bold text-xl lg:text-2xl whitespace-nowrap" />
  </Link>
);


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-grey-900 hover:text-brand-700 transition-colors duration-300 font-medium tracking-wide ${isActive ? 'text-brand-700' : ''}`;
    
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/submit-template', label: 'Submit Template' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-grey-200">
      <div className="container mx-auto px-6 py-4">
        {/* --- Desktop View --- */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex-1 flex justify-start">
            <BrandIdentity />
          </div>

          <nav className="flex-shrink-0" aria-label="Main navigation">
            <ul className="flex items-center space-x-4 lg:space-x-6">
              {navItems.map(item => (
                <li key={item.to}><NavLink to={item.to} className={navLinkClass}>{item.label}</NavLink></li>
              ))}
            </ul>
          </nav>

          <div className="flex-1" aria-hidden="true">
            {/* This div balances the header for centering the nav */}
          </div>
        </div>
        
        {/* --- Mobile View --- */}
        <div className="md:hidden flex justify-between items-center">
           <BrandIdentity />
          <button onClick={() => setIsOpen(!isOpen)} className="text-base-text focus:outline-none" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
             {navItems.map(item => (
                <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} className={navLinkClass}>{item.label}</NavLink>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;