import React, { useState } from 'react';
import type { GalleryImage } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface GalleryImageCardProps {
    image: GalleryImage;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ image }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const { user, consumeDownload } = useAuth();

    const handleDownload = async () => {
        if (user.downloadsRemaining <= 0 || isDownloading) return;
        
        setIsDownloading(true);

        try {
            consumeDownload();
            const response = await fetch(image.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${image.id}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            // In a real app, show a success toast.
        } catch (error) {
            console.error("Download failed:", error);
            // In a real app, show an error toast and potentially credit the download back.
        } finally {
            setIsDownloading(false);
        }
    };
    
    const canDownload = user.downloadsRemaining > 0;

    return (
        <>
            <style>{`
                .watermark-container::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url('https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/Tempa-logo-dark-small.webp');
                    background-repeat: space;
                    background-size: 80px;
                    opacity: 0.1;
                    pointer-events: none;
                    transform: rotate(-30deg) scale(1.5);
                }
            `}</style>
            <div 
                className="relative aspect-[4/3] bg-bg-card rounded-xl shadow-lg overflow-hidden transition-transform duration-300 group watermark-container border border-border-primary"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img 
                    src={image.thumbUrl}
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />

                {image.tags?.includes('new') && (
                    <span className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
                )}
                {image.tags?.includes('popular') && (
                     <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">POPULAR</span>
                )}

                <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center p-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center">
                        <h4 className="text-white font-bold font-poppins">{image.title}</h4>
                        <button 
                            onClick={handleDownload}
                            disabled={!canDownload || isDownloading}
                            className="mt-4 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-500 bg-primary text-white hover:bg-primary-dark"
                        >
                            {isDownloading ? 'Downloading...' : canDownload ? 'Download' : 'No Credits'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GalleryImageCard;