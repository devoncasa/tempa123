import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import BrandName from './BrandName';
import { SITE_MAP } from '../src/siteMap';
import { ASSETS } from '../src/assets';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label={label}>
        {children}
    </a>
);

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
            {children}
        </Link>
    </li>
);

const Footer: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const clickCount = useRef(0);
    const clickTimer = useRef<number | null>(null);

    const handleLogoClick = () => {
        clickCount.current += 1;
        if (clickCount.current === 1) {
            clickTimer.current = window.setTimeout(() => {
                clickCount.current = 0;
            }, 1500);
        }
        if (clickCount.current === 3) {
            if (clickTimer.current) clearTimeout(clickTimer.current);
            setIsLoginModalOpen(true);
            clickCount.current = 0;
        }
    };

    return (
        <>
            <footer className="bg-gray-900 text-slate-100">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
                        <div className="col-span-2 md:col-span-4">
                            <div onClick={handleLogoClick} className="inline-block cursor-pointer mb-4" title="Admin Access">
                               <img src={ASSETS.LOGO_WHITE_FOOTER} alt="Tempa Web.123 Logo" className="h-8 w-auto" />
                            </div>
                            <p className="text-gray-400 text-sm">High-performance website templates for businesses ready to own their online presence.</p>
                            <div className="flex space-x-5 mt-6">
                                <SocialIcon href="#" label="Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.98,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.13,17.26 8.12,17.29C6.67,18.45 4.81,19.12 2.83,19.12C2.47,19.12 2.12,19.1 1.77,19.04C3.78,20.36 6.17,21.16 8.76,21.16C16,21.16 20.24,15.39 20.24,10.1C20.24,9.88 20.24,9.66 20.23,9.45C21,8.85 21.82,8.13 22.46,7.29L22.46,6Z" /></svg>
                                </SocialIcon>
                                <SocialIcon href="#" label="LINE">
                                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 5.58,20 10,20C10.64,20 11.2,20.56 11.2,21.2V22.79C11.2,23.44 11.76,24 12.4,24H12.6C18.24,24 23.2,18.96 23.2,13.2C23.2,7.04 18.16,2 12,2M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7Z" /></svg>
                                </SocialIcon>
                                <SocialIcon href="#" label="Facebook">
                                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H17L16.5,14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" /></svg>
                                </SocialIcon>
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-white tracking-wider uppercase mb-4">Services</h3>
                            <ul className="space-y-3">
                                <FooterLink to={SITE_MAP.CATALOG}>Template Catalog</FooterLink>
                                <FooterLink to={SITE_MAP.PRICING}>Add-On Packages & Pricing</FooterLink>
                                <FooterLink to={SITE_MAP.LINE_ORDERING_KIT}>500฿ LINE Kit</FooterLink>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
                            <ul className="space-y-3">
                                <FooterLink to={SITE_MAP.ABOUT}>About Us</FooterLink>
                                <FooterLink to={SITE_MAP.WHY_US}>Why Us</FooterLink>
                                <FooterLink to={SITE_MAP.BLOG}>Blog</FooterLink>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
                            <ul className="space-y-3">
                                <FooterLink to={SITE_MAP.CONTACT}>Contact</FooterLink>
                                <FooterLink to={SITE_MAP.PRICING}>FAQ</FooterLink>
                                <FooterLink to={SITE_MAP.SUBMIT_TEMPLATE}>Submit Template</FooterLink>
                            </ul>
                        </div>
                         <div className="col-span-2 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <FooterLink to="#">Privacy Policy</FooterLink>
                                <FooterLink to="#">Terms & Conditions</FooterLink>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
                        <p className="text-gray-500 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Tempa Web.123. All Rights Reserved.</p>
                        <p className="text-gray-500">
                           919/1 JTC Bldg, Silom, Bangrak, Bangkok 10500, Thailand
                        </p>
                    </div>
                </div>
            </footer>
            {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
        </>
    );
};

export default Footer;