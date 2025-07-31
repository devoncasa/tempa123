
import React, { useState, useEffect } from 'react';

const UnderDevelopmentPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'th'>('en');

    const content = {
        en: {
            title: 'Welcome to Tempa Web.123 - www.tempa123.com',
            body: "Our website is currently under major development as we build a better experience for you. Some sections, like our 'Why Us' and 'Pricing' pages, are ready for you to explore. We invite you to look around to see how we're different.",
            btn1: 'Continue to Site',
            btn2: 'Leave Website'
        },
        th: {
            title: 'ยินดีต้อนรับสู่ Tempa Web.123 - www.tempa123.com',
            body: 'ขณะนี้เว็บไซต์ของเรากำลังอยู่ในระหว่างการปรับปรุงและพัฒนาครอบคลุมในทุกส่วน รวมถึงงานด้าน graphic และ template ต่างๆในระบบของเรา เพื่อมอบประสบการณ์การใช้งานที่เหนือกว่า ทั้งนี้ ท่านสามารถเข้าชมหน้าสำคัญต่าง ๆ ได้แล้ว ได้แก่ หน้า "Why Us" และ "Pricing" เพื่อทำความเข้าใจเกี่ยวกับเนื้อหา การให้บริการ และจุดเด่นที่ทำให้บริการของเราแตกต่างจากที่อื่น',
            btn1: 'เข้าสู่เว็บไซต์',
            btn2: 'ออกจากเว็บไซต์'
        }
    };

    useEffect(() => {
        if (!sessionStorage.getItem('devPopupShown')) {
            setIsOpen(true);
        }
    }, []);

    const closePopup = () => {
        sessionStorage.setItem('devPopupShown', 'true');
        setIsOpen(false);
    };

    const leaveSite = () => {
        // This will attempt to close the tab, but might be blocked by browsers.
        // A fallback to a neutral page is safer.
        window.open('about:blank', '_self');
        window.close();
    };

    if (!isOpen) {
        return null;
    }
    
    const selectedContent = content[language];

    return (
        <>
            <style>{`
                /* --- Core Variables (Uses root variables from the main app) --- */

                /* --- Popup Overlay --- */
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(45, 55, 72, 0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }

                .popup-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                /* --- Popup Container --- */
                .popup-container {
                    font-family: 'Poppins', sans-serif;
                    background-color: var(--brand-100); 
                    /* Increased top padding to make space for the absolutely positioned logo */
                    padding: 60px 40px 40px 40px;
                    margin-top: 40px; /* Add margin to prevent logo from being cut off at the top */
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    width: 90%;
                    max-width: 600px;
                    position: relative;
                    border: 2px solid var(--brand-700);
                    transform: scale(0.95);
                    transition: transform 0.3s ease;
                    text-align: center;
                }
                
                .popup-overlay.active .popup-container {
                    transform: scale(1);
                }

                /* --- Popup Logo --- */
                .popup-logo {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    height: 60px; /* Adjusted size for better proportions */
                    width: auto;
                    background-color: var(--brand-100);
                    border-radius: 12px; /* Make it a rounded rectangle */
                    padding: 10px 20px; /* Adjust padding for the logo's aspect ratio */
                    border: 2px solid var(--brand-700);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    z-index: 1; /* Ensure logo is above container's pseudo elements */
                }

                /* --- Elegant Frame Decoration --- */
                .popup-container::before, .popup-container::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: var(--brand-700);
                    border-style: solid;
                }
                .popup-container::before {
                    top: -2px;
                    left: -2px;
                    border-width: 2px 0 0 2px;
                    border-top-left-radius: 12px;
                }
                .popup-container::after {
                    bottom: -2px;
                    right: -2px;
                    border-width: 0 2px 2px 0;
                    border-bottom-right-radius: 12px;
                }

                /* --- Language Switcher --- */
                .lang-switcher {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    font-size: 14px;
                }
                .lang-switcher button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: 'Poppins', sans-serif;
                    font-weight: bold;
                    color: var(--grey-600);
                    padding: 5px;
                }
                .lang-switcher button.active {
                    color: var(--brand-700);
                    text-decoration: underline;
                }

                /* --- Content Styling --- */
                .popup-content h2 {
                    color: var(--brand-700);
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: 22px;
                    font-weight: 700;
                }
                .popup-content p {
                    color: var(--grey-900);
                    line-height: 1.7;
                    margin-bottom: 30px;
                }

                /* --- Button Container & Styling --- */
                .popup-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                }
                .popup-btn {
                    padding: 12px 25px;
                    border-radius: 8px;
                    border: 2px solid var(--brand-700);
                    font-family: 'Poppins', sans-serif;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-primary {
                    background-color: var(--brand-700);
                    color: var(--white);
                }
                .btn-primary:hover {
                    opacity: 0.85;
                }
                .btn-secondary {
                    background-color: transparent;
                    color: var(--brand-700);
                }
                .btn-secondary:hover {
                    background-color: var(--brand-700);
                    color: var(--white);
                }
            `}</style>
            <div className={`popup-overlay ${isOpen ? 'active' : ''}`} id="devPopupOverlay">
                <div className="popup-container">
                    <img src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/Tempa-logo-small-fit.webp" alt="Tempa Web.123 Logo" className="popup-logo" />
                    <div className="lang-switcher">
                        <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button> |
                        <button onClick={() => setLanguage('th')} className={language === 'th' ? 'active' : ''}>TH</button>
                    </div>
                    <div className="popup-content" id="popupContent">
                        <h2>{selectedContent.title}</h2>
                        <p>{selectedContent.body}</p>
                        <div className="popup-buttons">
                            <button className="popup-btn btn-secondary" onClick={leaveSite}>{selectedContent.btn2}</button>
                            <button className="popup-btn btn-primary" onClick={closePopup}>{selectedContent.btn1}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnderDevelopmentPopup;