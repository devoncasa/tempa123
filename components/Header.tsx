
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandName from './BrandName';

interface NavItem {
  to?: string;
  label: string;
  dropdown?: NavItem[];
}

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
  const location = useLocation();
    
  const navItems: NavItem[] = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/catalog', label: 'Catalog' },
    { 
      label: 'Pricing',
      to: '/pricing',
      dropdown: [
        { to: '/pricing', label: 'Licenses' },
        { to: '/pricing/customization-services', label: 'Customization Services' }
      ]
    },
    { to: '/blog', label: 'Blog' },
    { to: '/submit-template', label: 'Submit Template' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const isPricingActive = location.pathname.startsWith('/pricing');

  return (
    <>
      <style>{`
        .main-nav-link {
          color: var(--text-nav);
          font-weight: 500;
          letter-spacing: 0.025em; /* 'tracking-wide' equivalent */
          transition: color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 2px;
          text-underline-offset: 6px;
          padding-bottom: 2px;
        }
        .main-nav-link:hover {
          text-decoration-color: var(--accent-color);
        }
        .main-nav-link:active {
          color: var(--accent-color);
        }
        .main-nav-link.active {
          color: var(--text-nav-active);
          font-weight: 600;
        }
        
        .group:hover .group-hover\\:block {
            display: block;
        }
      `}</style>
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
                  <li key={item.label} className="relative group">
                    {item.dropdown ? (
                       <>
                        <button className={`main-nav-link flex items-center gap-1 ${isPricingActive ? 'active' : ''}`}>
                          {item.label}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                          {item.dropdown.map(subItem => (
                            <NavLink key={subItem.to} to={subItem.to!} className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'bg-brand-100 text-brand-900' : 'text-grey-900'} hover:bg-brand-100`}>
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                       </>
                    ) : (
                      <NavLink to={item.to!} className="main-nav-link">{item.label}</NavLink>
                    )}
                  </li>
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
            <nav className="flex flex-col items-center space-y-2 py-4">
              {navItems.map(item => (
                  <React.Fragment key={item.label}>
                    {item.dropdown ? (
                      <div className='text-center'>
                        <span className={`main-nav-link text-lg ${isPricingActive ? 'active' : ''}`}>{item.label}</span>
                        <div className="flex flex-col items-center mt-2 space-y-2">
                           {item.dropdown.map(subItem => (
                            <NavLink key={subItem.to} to={subItem.to!} onClick={() => setIsOpen(false)} className="main-nav-link text-base text-grey-600">{subItem.label}</NavLink>
                           ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink to={item.to!} onClick={() => setIsOpen(false)} className="main-nav-link text-lg">{item.label}</NavLink>
                    )}
                  </React.Fragment>
                ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
