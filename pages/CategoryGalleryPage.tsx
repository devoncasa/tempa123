import React from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORIES, GALLERY_CATEGORY_DETAILS, GALLERY_IMAGES } from '../constants';
import { TemplateCategory } from '../types';
import Seo from '../components/Seo';
import NotFoundPage from './NotFoundPage';
import GalleryImageCard from '../components/GalleryImageCard';

const CategoryGalleryPage: React.FC = () => {
    const { category: urlCategory } = useParams<{ category: string }>();
    const categoryName = urlCategory ? decodeURIComponent(urlCategory) as TemplateCategory : undefined;

    if (!categoryName || !Object.values(TemplateCategory).includes(categoryName)) {
        return <NotFoundPage />;
    }

    const categoryInfo = CATEGORIES.find(c => c.name === categoryName);
    const categoryDetails = GALLERY_CATEGORY_DETAILS[categoryName] || { quote: "Inspiration for every creator.", color: "#1dc3b6" };
    const images = GALLERY_IMAGES[categoryName] || [];

    return (
        <>
            <Seo
                title={`${categoryName} | Inspiration Gallery`}
                description={`Browse high-quality images for the ${categoryName} industry.`}
            />
            <div className="bg-bg-primary">
                {/* Category Header */}
                <div className="py-12 bg-bg-secondary border-b-4" style={{ borderColor: categoryDetails.color }}>
                    <div className="container mx-auto px-6 lg:px-[8vw] text-center">
                        <div className="inline-block" style={{ color: categoryDetails.color }}>
                            {categoryInfo?.icon}
                        </div>
                        <h1 className="text-4xl font-bold font-poppins text-text-primary mt-2">{categoryName}</h1>
                        <p className="text-lg text-text-secondary mt-4 italic font-lora">"{categoryDetails.quote}"</p>
                    </div>
                </div>

                {/* Image Grid */}
                <div className="container mx-auto px-6 lg:px-[8vw] py-16">
                    {images.length > 0 ? (
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {images.map(image => (
                                <GalleryImageCard key={image.id} image={image} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-text-primary">Coming Soon!</h2>
                            <p className="text-text-secondary mt-2">We're busy curating images for this category. Check back later!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryGalleryPage;
