import React, { useState, useEffect } from 'react';
import BrandName from './BrandName';

const WelcomePopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('devPopupDismissed')) {
            setIsOpen(true);
        }
    }, []);

    const handleContinue = () => {
        sessionStorage.setItem('devPopupDismissed', 'true');
        setIsOpen(false);
    };
    
    const handleLeave = () => {
         // A simple and non-disruptive way to "leave" is to go back in history.
         // window.close() is often blocked by browsers.
         if (window.history.length > 1) {
            window.history.back();
         } else {
             // Fallback if there's no history, just close the popup
             handleContinue();
         }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <style>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(45, 55, 72, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease;
                    font-family: 'Inter', sans-serif;
                }

                .popup-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                .popup-container {
                    background-color: var(--brand-50); /* light pastel teal */
                    padding: 20px 40px 40px 40px;
                    border-radius: 24px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 550px;
                    position: relative;
                    transform: scale(0.95) translateY(10px);
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    text-align: center;
                    opacity: 0;
                }
                
                .popup-overlay.active .popup-container {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                
                .popup-logo-container {
                    width: 80px;
                    height: 80px;
                    background-color: var(--white);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: -60px auto 15px auto;
                    position: relative;
                    z-index: 10;
                    /* A multi-layered box-shadow creates a sophisticated frame effect */
                    box-shadow: 0 0 0 4px var(--brand-50), 0 0 0 6px var(--brand-200), 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .popup-lang-switcher {
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-secondary);
                }
                .popup-lang-switcher span {
                    cursor: pointer;
                    padding: 5px;
                }
                 .popup-lang-switcher span.active {
                    color: var(--brand-700);
                    font-weight: 700;
                 }

                .popup-content h2 {
                    font-family: 'Poppins', sans-serif;
                    color: var(--brand-700);
                    margin-top: 0;
                    margin-bottom: 8px;
                    font-size: 24px;
                    font-weight: 700;
                }

                .popup-content .subtitle {
                     font-family: 'Poppins', sans-serif;
                     color: var(--text-secondary);
                     margin-bottom: 16px;
                }

                .popup-content > p {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 24px;
                    max-width: 450px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .popup-buttons {
                    display: flex;
                    flex-direction: row;
                    gap: 15px;
                    justify-content: center;
                }
                .popup-btn {
                    padding: 12px 30px;
                    border-radius: 50px;
                    border: 2px solid transparent;
                    font-family: 'Poppins', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .popup-btn.btn-primary {
                    background-color: var(--brand-500);
                    color: var(--white);
                    border-color: var(--brand-500);
                }
                .popup-btn.btn-primary:hover {
                    background-color: var(--brand-700);
                    border-color: var(--brand-700);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(29, 195, 182, 0.2);
                }
                .popup-btn.btn-secondary {
                    background-color: transparent;
                    color: var(--brand-700);
                    border-color: var(--brand-500);
                }
                .popup-btn.btn-secondary:hover {
                    background-color: var(--brand-100);
                    color: var(--brand-900);
                }
            `}</style>
            <div className={`popup-overlay ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-labelledby="popup-title">
                <div className="popup-container">
                    <div className="popup-logo-container">
                       <img 
                         src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/Tempa-logo-dark-small.webp" 
                         alt="Tempa Web.123 Logo" 
                         className="h-12 w-auto" 
                       />
                    </div>
                    
                    <div className="popup-lang-switcher">
                        <span className="active">EN</span> | <span>TH</span>
                    </div>

                    <div className="popup-content" id="popupContent">
                        <h2 id="popup-title">Welcome to <BrandName /></h2>
                        <p className="subtitle">www.tempa123.com</p>
                        
                        <p>
                            This website is currently under development. You may continue to the site to explore the existing features, but please be aware that some content is for demonstration purposes only.
                        </p>
                        
                        <div className="popup-buttons mt-6">
                            <button className="popup-btn btn-secondary" onClick={handleLeave}>Leave Website</button>
                            <button className="popup-btn btn-primary" onClick={handleContinue}>Continue to Site</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WelcomePopup;