import React, { useRef } from 'react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalId: string;
    title: string;
    children: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, modalId, title, children }) => {
    const modalBodyRef = useRef<HTMLDivElement>(null);

    const printModalContent = () => {
        if (!modalBodyRef.current) return;
    
        const content = modalBodyRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Please allow popups to print this document.");
            return;
        }
        printWindow.document.write(`
            <html>
                <head>
                    <title>${title} - Tempa Web.123</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; padding: 2rem; color: #374151; }
                        h3 { margin-top: 1.5em; font-size: 1.2em; color: #111827; }
                        p, li { margin-bottom: 1em; }
                        ul { padding-left: 1.5em; }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${content}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    if (!isOpen) return null;

    return (
        <div
            id={modalId}
            className={`modal-overlay ${isOpen ? 'visible' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalId}-title`}
            onClick={onClose}
        >
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2 id={`${modalId}-title`} className="modal-title">{title}</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
                </header>
                <main className="modal-body" ref={modalBodyRef}>
                    {children}
                </main>
                <footer className="modal-footer">
                    <button className="print-btn" onClick={printModalContent}>Print / Save PDF</button>
                </footer>
            </div>
        </div>
    );
};

export default LegalModal;
