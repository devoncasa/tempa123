
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
            body: 'ขณะนี้เว็บไซต์ของเรากำลังอยู่ระหว่างการพัฒนาครั้งใหญ่เพื่อสร้างประสบการณ์ที่ดียิ่งขึ้นสำหรับคุณ อย่างไรก็ตาม บางส่วนของเว็บไซต์ เช่น หน้า "Why Us" และ "Pricing" พร้อมให้คุณเข้าชมแล้ว เราขอเชิญคุณเข้ามาเยี่ยมชมเพื่อทำความเข้าใจในสิ่งที่เราทำและความแตกต่างของเรา',
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
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    width: 90%;
                    max-width: 600px;
                    position: relative;
                    border: 2px solid var(--brand-700);
                    transform: scale(0.95);
                    transition: transform 0.3s ease;
                }
                
                .popup-overlay.active .popup-container {
                    transform: scale(1);
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
                    margin-right: 40px; /* Space for lang switcher */
                    font-size: 24px;
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
                    flex-wrap: wrap;
                    gap: 15px;
                    justify-content: flex-end;
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
