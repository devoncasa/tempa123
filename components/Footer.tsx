import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (clickCount === 0) return;
        const timer = setTimeout(() => setClickCount(0), 1000); // Reset after 1 second
        return () => clearTimeout(timer);
    }, [clickCount]);

    const handleLogoClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        if (newClickCount === 3) {
            const password = prompt('Enter admin password:');
            if (password === 'k0007') {
                navigate('/admin');
            } else if (password !== null) {
                alert('Incorrect password.');
            }
            setClickCount(0); // Reset after trying
        }
    };

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 onClick={handleLogoClick} className="font-poppins font-bold text-lg mb-4 cursor-pointer" title="Admin Access">Tempa123</h3>
                        <p className="text-gray-400">919/1 JTC Building, Silom Road, Silom, Bangrak, Bangkok 10500, Thailand</p>
                    </div>
                    <div>
                        <h3 className="font-poppins font-bold text-lg mb-4">Contact</h3>
                        <p className="text-gray-400">Tel/Whatsapp/WeChat: +66(0)81 851 9922</p>
                        <p className="text-gray-400">Email: <a href="mailto:info@tempa123.com" className="hover:text-primary">info@tempa123.com</a></p>
                    </div>
                    <div>
                        <h3 className="font-poppins font-bold text-lg mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-primary">About</Link></li>
                            <li><Link to="/submit-template" className="text-gray-400 hover:text-primary">Submit Template</Link></li>
                            <li><Link to="/" className="text-gray-400 hover:text-primary">FAQ</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Tempa123. All Rights Reserved.</p>
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
    );
};

export default Footer;