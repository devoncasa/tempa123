import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import Seo from '../components/Seo';

const InspirationGalleryPage: React.FC = () => {
    return (
        <>
            <Seo
                title="Inspiration Gallery | Tempa Web.123"
                description="Explore thousands of high-quality, professional images sorted by industry to find the perfect assets for your website."
            />
            <div className="bg-bg-secondary py-16">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-text-primary">Inspiration Gallery</h1>
                        <p className="text-lg text-text-secondary mt-4">
                            Explore thousands of high-quality, professional images to bring your vision to life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {CATEGORIES.map((category) => (
                            <Link 
                                to={`/gallery/${encodeURIComponent(category.name)}`} 
                                key={category.name} 
                                className="bg-bg-card p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-center justify-center border border-border-primary hover:border-primary group"
                            >
                                <div className="flex justify-center mb-4 text-primary group-hover:text-accent transition-colors duration-300">{category.icon}</div>
                                <h3 className="text-xl font-bold text-text-primary font-poppins">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InspirationGalleryPage;
