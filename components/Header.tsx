import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandName from './BrandName';
import { useAuth } from '../contexts/AuthContext';
import { SITE_MAP } from '../src/siteMap';
import { ASSETS } from '../src/assets';

interface NavItem {
  to?: string;
  label: React.ReactNode;
  dropdown?: NavItem[];
}

const BrandIdentity: React.FC = () => (
  <Link to={SITE_MAP.HOME} className="flex items-center gap-3" aria-label="Tempa Web.123 - Homepage">
    <img 
      src={ASSETS.LOGO_DARK} 
      alt="Tempa Web.123 Logo" 
      className="h-10 w-auto" 
    />
    <BrandName className="font-poppins font-bold text-xl lg:text-2xl whitespace-nowrap" />
  </Link>
);


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  
  const isThaiPage = location.pathname.startsWith(SITE_MAP.LINE_ORDERING_KIT);

  const navItemsEN: NavItem[] = [
    { to: SITE_MAP.HOME, label: 'Home' },
    { to: SITE_MAP.ABOUT, label: 'About Us' },
    { to: SITE_MAP.WHY_US, label: 'Why Us' },
    { to: SITE_MAP.CATALOG, label: 'Catalog' },
    { to: SITE_MAP.INSPIRATION_GALLERY, label: 'Inspiration Gallery' },
    {
      to: SITE_MAP.PRICING,
      label: 'Pricing',
      dropdown: [
        { to: SITE_MAP.PRICING, label: 'Licenses & Membership' },
        { to: SITE_MAP.PRICING_CUSTOMIZATION, label: 'Customization Services' },
        { to: SITE_MAP.PRICING_CALCULATOR, label: 'Project Calculator' },
        { to: SITE_MAP.LINE_ORDERING_KIT, label: '500฿ LINE Kit' },
      ],
    },
    { to: SITE_MAP.BLOG, label: 'Blog' },
    { to: SITE_MAP.CONTACT, label: 'Contact Us' },
  ];

  const navItemsTH: NavItem[] = [
    { to: SITE_MAP.HOME, label: 'หน้าหลัก' },
    { to: SITE_MAP.ABOUT, label: 'เกี่ยวกับเรา' },
    { to: SITE_MAP.WHY_US, label: 'ทำไมต้องเรา' },
    { to: SITE_MAP.CATALOG, label: 'แคตตาล็อก' },
    { to: SITE_MAP.INSPIRATION_GALLERY, label: 'แกลเลอรี่แรงบันดาลใจ' },
    {
      to: SITE_MAP.PRICING,
      label: 'ราคา',
      dropdown: [
        { to: SITE_MAP.PRICING, label: 'ใบอนุญาตและสมาชิก' },
        { to: SITE_MAP.PRICING_CUSTOMIZATION, label: 'บริการปรับแต่ง' },
        { to: SITE_MAP.PRICING_CALCULATOR, label: 'คำนวณราคาโปรเจค' },
        { to: SITE_MAP.LINE_ORDERING_KIT, label: '500฿ LINE Kit' },
      ],
    },
    { to: SITE_MAP.BLOG, label: 'บล็อก' },
    { to: SITE_MAP.CONTACT, label: 'ติดต่อเรา' },
  ];

  const navItems = isThaiPage ? navItemsTH : navItemsEN;
  const submitText = isThaiPage ? 'ส่งเทมเพลต' : 'Submit Template';
    
  useEffect(() => {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setOpenDropdown(null);
        }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpenDropdown(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleMouseEnter = (dropdownId: string) => {
      if (window.innerWidth > 768) {
          setOpenDropdown(dropdownId);
      }
  };
  
  const handleMouseLeave = () => {
      if (window.innerWidth > 768) {
          setOpenDropdown(null);
      }
  }

  const handleDropdownToggle = (dropdownId: string) => {
      setOpenDropdown(prev => (prev === dropdownId ? null : dropdownId));
  };


  const isPricingActive = location.pathname.startsWith('/pricing') || location.pathname.startsWith('/line-ordering-kit') || location.pathname.startsWith('/pricing-calculator');

  const UserMenu: React.FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    return (
        <div className="relative" onMouseLeave={() => setIsUserMenuOpen(false)}>
            <button onMouseEnter={() => setIsUserMenuOpen(true)} onClick={() => setIsUserMenuOpen(p => !p)} className="button-cta-header">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                <span>My Account</span>
            </button>
            {isUserMenuOpen && (
                <div className="dropdown-menu absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10" onMouseLeave={() => setIsUserMenuOpen(false)}>
                    <NavLink to={SITE_MAP.MY_ACCOUNT} className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'active' : ''} text-text-primary`}>My Account</NavLink>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-text-primary">Logout</button>
                </div>
            )}
        </div>
    );
  };

  return (
    <>
      <style>{`
        .main-nav-link {
          color: var(--color-text-nav);
          font-weight: 500;
          letter-spacing: 0.025em;
          transition: color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 2px;
          text-underline-offset: 6px;
          padding-bottom: 2px;
        }
        .main-nav-link:hover {
          color: var(--color-accent);
          text-decoration-color: var(--color-accent);
        }
        .main-nav-link:active {
          color: var(--color-accent);
        }
        .main-nav-link.active {
          color: var(--color-text-nav-active);
          font-weight: 600;
        }
        
        .dropdown-menu {
            background-color: var(--color-bg-card);
            border: 1px solid var(--color-border);
        }

        .dropdown-menu a:hover, .dropdown-menu button:hover {
            background-color: var(--color-bg-secondary);
        }

        .dropdown-menu a.active {
             background-color: var(--color-bg-secondary);
             color: var(--color-accent);
        }

        .button-cta-header {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border: 2px solid var(--color-primary);
          border-radius: 50px;
          background-color: transparent;
          color: var(--color-primary);
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .button-cta-header:hover,
        .button-cta-header:focus {
          background-color: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>
      <header className="bg-[rgba(255,255,255,0.7)] backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-border-primary">
        <div className="container mx-auto px-6 py-4">
          <div className="hidden md:flex justify-between items-center">
            <div className="flex-1 flex justify-start">
              <BrandIdentity />
            </div>

            <nav ref={navRef} className="flex-shrink-0" aria-label="Main navigation">
              <ul className="flex items-center space-x-4 lg:space-x-6">
                {navItems.map((item, index) => (
                  <li 
                    key={item.to || index}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.to!)}
                    onMouseLeave={() => item.dropdown && handleMouseLeave()}
                  >
                    {item.dropdown ? (
                       <>
                        <button
                          onClick={() => handleDropdownToggle(item.to!)}
                          className={`main-nav-link flex items-center gap-1 ${isPricingActive ? 'active' : ''}`}
                          aria-haspopup="true"
                          aria-expanded={openDropdown === item.to}
                        >
                          {item.label}
                          <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.to ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10 transition-all duration-200 ${openDropdown === item.to ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-2'}`}>
                          {item.dropdown.map(subItem => (
                            <NavLink 
                              key={subItem.to}
                              to={subItem.to!}
                              onClick={() => setOpenDropdown(null)}
                              className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'active' : ''} text-text-primary`}
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                       </>
                    ) : (
                      <NavLink to={item.to!} className={({isActive}) => `main-nav-link ${isActive ? 'active' : ''}`}>{item.label}</NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex-1 flex justify-end items-center gap-4">
                <div className="flex items-center">
                    <button className="main-nav-link flex items-center gap-1 opacity-60 cursor-not-allowed" disabled title="Language switching coming soon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" /><path d="M12.39 15.33a8.03 8.03 0 01-4.78 0 6.012 6.012 0 01-1.78-4.43c0-1.25.38-2.4 1.05-3.37L5.5 8.94a6.075 6.075 0 000 2.12c.7 1.2 1.8 2.13 3.1 2.58l.84-2.83a4.01 4.01 0 012.91 0l.84 2.83zM14.5 11.06a6.075 6.075 0 000-2.12L13.13 7.56a6.012 6.012 0 011.78 4.43c0 .5-.06 1-.18 1.47l-1.07-3.87z" /></svg>
                        <span>EN</span>
                    </button>
                </div>
                {user.isAuthenticated ? (
                    <UserMenu />
                ) : (
                    <Link to={SITE_MAP.SUBMIT_TEMPLATE} className="button-cta-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="fill-current"><path d="M11 15V6H13V15H11ZM11 19V17H13V19H11Z"></path></svg>
                        <span>{submitText}</span>
                    </Link>
                )}
            </div>
          </div>
          
          {/* Mobile View */}
          <div className="md:hidden flex justify-between items-center">
            <BrandIdentity />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text-primary focus:outline-none" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[rgba(255,255,255,0.7)] backdrop-blur-md shadow-lg">
            <nav className="flex flex-col items-center space-y-3 py-4">
              {navItems.map((item, index) => (
                  <React.Fragment key={item.to || index}>
                    {item.dropdown ? (
                      <div className='text-center w-full'>
                        <div className="flex items-center justify-center">
                          <NavLink
                              to={item.to!}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`main-nav-link text-lg ${isPricingActive ? 'active' : ''}`}
                          >
                              {item.label}
                          </NavLink>
                          <button
                              onClick={() => handleDropdownToggle('pricingMobileDropdown')}
                              className="p-2 -ml-2 text-text-primary"
                              aria-label="Toggle pricing submenu"
                              aria-expanded={openDropdown === 'pricingMobileDropdown'}
                          >
                              <svg className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'pricingMobileDropdown' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                        </div>

                        {openDropdown === 'pricingMobileDropdown' && (
                           <div className="flex flex-col items-center mt-2 space-y-2 bg-black/5 p-4 rounded-lg mx-4">
                            {item.dropdown.map(subItem => (
                              <NavLink key={subItem.to} to={subItem.to!} onClick={() => setIsMobileMenuOpen(false)} className="main-nav-link text-base text-text-secondary py-1">{subItem.label}</NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink to={item.to!} onClick={() => setIsMobileMenuOpen(false)} className="main-nav-link text-lg">{item.label}</NavLink>
                    )}
                  </React.Fragment>
                ))}
                {user.isAuthenticated ? (
                  <>
                    <NavLink to={SITE_MAP.MY_ACCOUNT} onClick={() => setIsMobileMenuOpen(false)} className="main-nav-link text-lg">My Account</NavLink>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="main-nav-link text-lg text-accent">Logout</button>
                  </>
                ) : (
                  <NavLink to={SITE_MAP.SUBMIT_TEMPLATE} onClick={() => setIsMobileMenuOpen(false)} className="main-nav-link text-lg">{submitText}</NavLink>
                )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;