import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import LegalModal from '../components/LegalModal';
import { TermsAndConditionsContent, PrivacyPolicyContent } from '../src/legalContent';

type ModalType = 'terms' | 'privacy' | null;

interface LegalModalContextType {
    openModal: (modal: 'terms' | 'privacy') => void;
}

const LegalModalContext = createContext<LegalModalContextType | undefined>(undefined);

export const LegalModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = useCallback((modal: 'terms' | 'privacy') => {
        setActiveModal(modal);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        if (activeModal) {
             document.body.style.overflow = 'hidden';
             window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [activeModal, closeModal]);

    return (
        <LegalModalContext.Provider value={{ openModal }}>
            {children}
            <LegalModal
                isOpen={activeModal === 'terms'}
                onClose={closeModal}
                modalId="terms-modal"
                title="Terms and Conditions"
            >
                <TermsAndConditionsContent />
            </LegalModal>
            <LegalModal
                isOpen={activeModal === 'privacy'}
                onClose={closeModal}
                modalId="privacy-modal"
                title="Privacy Policy"
            >
                <PrivacyPolicyContent />
            </LegalModal>
        </LegalModalContext.Provider>
    );
};

export const useLegalModal = () => {
    const context = useContext(LegalModalContext);
    if (context === undefined) {
        throw new Error('useLegalModal must be used within a LegalModalProvider');
    }
    return context;
};
