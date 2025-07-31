
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-200 hover:text-white transition-colors duration-300">
        {children}
    </a>
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
            }, 1500); // 1.5-second window
        }

        if (clickCount.current === 3) {
            if (clickTimer.current) {
                clearTimeout(clickTimer.current);
            }
            setIsLoginModalOpen(true);
            clickCount.current = 0;
        }
    };

    return (
        <>
            <footer className="bg-grey-900 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <div onClick={handleLogoClick} className="inline-block cursor-pointer mb-4" title="Admin Access">
                               <img src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/logos/Tempa-logo-white-footer-small.webp" alt="Tempa123 Footer Logo" className="h-8 w-auto" />
                            </div>
                            <p className="text-grey-600">919/1 JTC Building, Silom Road, Silom, Bangrak, Bangkok 10500, Thailand</p>
                        </div>
                        <div>
                            <h3 className="font-poppins font-bold text-lg mb-4">Contact</h3>
                            <p className="text-grey-600">Tel/Whatsapp/WeChat: +66(0)81 851 9922</p>
                            <p className="text-grey-600">Email: <a href="mailto:info@tempa123.com" className="hover:text-brand-500">info@tempa123.com</a></p>
                        </div>
                        <div>
                            <h3 className="font-poppins font-bold text-lg mb-4">Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-grey-600 hover:text-brand-500">About Us</Link></li>
                                <li><Link to="/why-us" className="text-grey-600 hover:text-brand-500">Why Us</Link></li>
                                <li><Link to="/blog" className="text-grey-600 hover:text-brand-500">Blog</Link></li>
                                <li><Link to="/pricing" className="text-grey-600 hover:text-brand-500">Pricing</Link></li>
                                <li><Link to="/submit-template" className="text-grey-600 hover:text-brand-500">Submit Template</Link></li>
                                <li><Link to="/" className="text-grey-600 hover:text-brand-500">FAQ</Link></li>
                                <li><Link to="/contact" className="text-grey-600 hover:text-brand-500">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-grey-600/50 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-grey-600 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Tempa Web.123. All Rights Reserved.</p>
                        <div className="flex space-x-6">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.98,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.13,17.26 8.12,17.29C6.67,18.45 4.81,19.12 2.83,19.12C2.47,19.12 2.12,19.1 1.77,19.04C3.78,20.36 6.17,21.16 8.76,21.16C16,21.16 20.24,15.39 20.24,10.1C20.24,9.88 20.24,9.66 20.23,9.45C21,8.85 21.82,8.13 22.46,7.29L22.46,6Z" /></svg>
                            </SocialIcon>
                             <SocialIcon href="#">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 5.58,20 10,20C10.64,20 11.2,20.56 11.2,21.2V22.79C11.2,23.44 11.76,24 12.4,24H12.6C18.24,24 23.2,18.96 23.2,13.2C23.2,7.04 18.16,2 12,2M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7Z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H17L16.5,14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" /></svg>
                            </SocialIcon>
                        </div>
                    </div>
                </div>
            </footer>
            {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
        </>
    );
};

export default Footer;
