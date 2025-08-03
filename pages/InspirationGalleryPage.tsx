import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useAuth } from '../contexts/AuthContext';

const placeholderImages = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/${100 + i}/${400 + Math.floor(Math.random() * 100)}/${300 + Math.floor(Math.random() * 300)}`,
    fullUrl: `https://picsum.photos/seed/${100 + i}/1200/800`,
    title: `Abstract Image ${i + 1}`,
    category: ['Business', 'Lifestyle', 'Nature', 'Technology'][i % 4]
}));

const imageCategories = ['All', 'Business', 'Lifestyle', 'Nature', 'Technology'];

const InspirationGalleryPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const { user, consumeDownload } = useAuth();
    
    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') return placeholderImages;
        return placeholderImages.filter(img => img.category === activeCategory);
    }, [activeCategory]);
    
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (lightboxIndex === null) return;
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'Escape') closeLightbox();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, filteredImages]);

    const openLightbox = (index: number) => {
      document.body.style.overflow = 'hidden';
      setLightboxIndex(index);
    };
    const closeLightbox = () => {
      document.body.style.overflow = '';
      setLightboxIndex(null);
    };
    const showNextImage = () => setLightboxIndex(prev => (prev === null || prev === filteredImages.length - 1) ? 0 : prev + 1);
    const showPrevImage = () => setLightboxIndex(prev => (prev === null || prev === 0) ? filteredImages.length - 1 : prev - 1);

    const handleDownload = async () => {
        if (user.downloadsRemaining <= 0 || isDownloading || lightboxIndex === null) return;
        
        setIsDownloading(true);
        const image = filteredImages[lightboxIndex];

        try {
            consumeDownload();
            const response = await fetch(image.fullUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${image.title.replace(' ', '-')}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    
    const canDownload = user.downloadsRemaining > 0;
    const Lightbox = () => {
        if (lightboxIndex === null) return null;
        const image = filteredImages[lightboxIndex];
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={closeLightbox}>
                <button onClick={(e) => { e.stopPropagation(); showPrevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors" aria-label="Previous image">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="relative" onClick={e => e.stopPropagation()}>
                    <img src={image.fullUrl} alt={image.title} className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl" />
                    <div className="absolute -bottom-16 left-0 right-0 p-4 text-center">
                        <button onClick={handleDownload} disabled={!canDownload || isDownloading} className="px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-500 bg-primary text-white hover:bg-primary-dark shadow-lg">
                           {isDownloading ? 'Downloading...' : canDownload ? `Download (${user.downloadsRemaining} left)` : 'No Credits'}
                        </button>
                    </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); showNextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors" aria-label="Next image">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors" aria-label="Close lightbox">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        );
    };

    return (
        <>
            <Seo
                title="Inspiration Gallery | Tempa Web.123"
                description="Explore thousands of high-quality, professional images sorted by industry to find the perfect assets for your website."
            />
            <style>{`
                .masonry-grid {
                    column-count: 1;
                    column-gap: 1.5rem; /* 24px */
                }
                @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
                @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
                @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
                .masonry-item {
                    break-inside: avoid;
                    margin-bottom: 1.5rem; /* 24px */
                }
            `}</style>
            <div className="bg-bg-primary">
                {/* Section 1: Hero Video Showcase */}
                <section className="container mx-auto px-6 lg:px-[8vw] pt-12 md:pt-16">
                    <div className="inspiration-gallery-section !my-0">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins">Unlock Your Creative Potential</h2>
                        <div className="video-frame">
                            <video autoPlay muted playsInline preload="metadata" poster="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/logos/tempa123-flying-banner-logo.webp">
                                <source src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/logos/tempa123-photo-gallery-002.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <p className="gallery-intro-text max-w-2xl mx-auto">
                            The Inspiration Gallery is a premium, curated library of high-resolution stock photography, available exclusively to our subscribers and customization clients.
                        </p>
                    </div>
                </section>

                {/* Section 2: Photo Stock Gallery */}
                <section className="py-16 md:py-24 bg-bg-secondary">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h2 className="text-3xl font-bold font-poppins text-center mb-4">Explore the Collection</h2>
                        <div className="flex justify-center flex-wrap gap-3 mb-12">
                            {imageCategories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === category ? 'bg-primary text-white shadow' : 'bg-white text-grey-600 hover:bg-gray-200'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        <div className="masonry-grid">
                            {filteredImages.map((image, index) => (
                                <div key={image.id} className="masonry-item relative rounded-lg overflow-hidden shadow-md group cursor-pointer" onClick={() => openLightbox(index)}>
                                    <img src={image.url} alt={image.title} className="w-full h-auto block" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <div className="flex items-center gap-3 text-white">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            <h3 className="font-bold">{image.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: Final CTA */}
                <section className="py-20" style={{backgroundColor: 'var(--brand-900)'}}>
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <h2 className="text-3xl font-bold font-poppins mb-4 text-white">Ready to Access the Full Gallery?</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                            Our Inspiration Gallery is just one of the many benefits of our professional customization packages. Let us build your vision.
                        </p>
                        <Link 
                            to="/pricing/customization-services" 
                            className="btn btn-secondary-outline !text-white !border-white hover:!bg-white hover:!text-brand-900 !px-8 !py-3 !text-base"
                        >
                            Explore Customization Packages
                        </Link>
                    </div>
                </section>
                
                <Lightbox />
            </div>
        </>
    );
};

export default InspirationGalleryPage;