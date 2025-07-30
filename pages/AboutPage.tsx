import React from 'react';
import { Link } from 'react-router-dom';
import BrandName from '../components/BrandName';

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/about/';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const BenefitCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-brand-100 text-brand-700 rounded-full p-3">
            <CheckIcon />
        </div>
        <div>
            <h3 className="text-xl font-poppins font-bold text-grey-900">{title}</h3>
            <p className="text-grey-600 mt-1">{description}</p>
        </div>
    </div>
);

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white text-base-text font-inter">
            {/* SECTION 1 – Hero Header */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-grey-900">About Us</h1>
                            <h2 className="text-2xl md:text-3xl font-poppins text-grey-600 italic mt-2 mb-6">Your Business. Your Customers. Your Profits.</h2>
                            <p className="text-lg text-grey-600 leading-relaxed">
                                We’re based in Bangkok, and every day, we witness the grit and ambition of small business owners—from local food vendors to boutique shopkeepers. What we also see is the growing pressure to stay profitable in an increasingly digital world.
                            </p>
                        </div>
                        <div>
                            <img src={`${IMAGE_BASE_URL}about-hero.webp`} alt="Ambitious small business owner in their shop" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 – Why We Exist */}
            <section className="py-16 md:py-24 bg-bg-secondary">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img src={`${IMAGE_BASE_URL}why-we-exist.webp`} alt="Business owner working on a laptop in a cafe" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Why We Exist</h2>
                            <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                Today, moving your business online isn’t optional—it’s a necessity. But doing so often comes at a high price.
                            </p>
                            <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                Many business owners rely on large delivery and e-commerce platforms that take up to <strong className="text-brand-700">30% in commissions</strong>, reducing your margins and forcing you to keep spending on ads just to stay visible.
                            </p>
                            <p className="text-lg text-grey-900 leading-relaxed font-semibold">
                                <BrandName /> was created to give you a smarter, more sustainable alternative.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* SECTION 3 – What We Offer */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900">What We Offer</h2>
                        <p className="text-2xl text-grey-600 italic mt-2">A Platform That Puts You in Control</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <BenefitCard title="Direct Customer Access" description="Link your site from LINE, Facebook, or Instagram." />
                            <BenefitCard title="End-to-End Control" description="Customers browse, order, and upload payment—all in one place." />
                            <BenefitCard title="Eliminate Commission Fees" description="Use your own delivery system. Keep full revenue." />
                        </div>
                        <div>
                            <img src={`${IMAGE_BASE_URL}what-we-offer.webp`} alt="Website mockup on a phone and tablet showing direct customer access" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 – Engineered for Performance */}
            <section className="py-16 md:py-24 bg-bg-secondary">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Engineered for Performance</h2>
                            <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                Our templates are designed with clean, optimized code for fast loading and strong SEO performance. Whether viewed on phone or desktop, the ordering experience is seamless, intuitive, and reliable.
                            </p>
                            <p className="text-lg text-grey-600 leading-relaxed font-semibold italic">
                                This is not just about having a website—it’s about owning a digital asset that performs efficiently and works for you.
                            </p>
                        </div>
                        <div>
                            <img src={`${IMAGE_BASE_URL}performance-engine.webp`} alt="Graph showing performance and speed increase" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* SECTION 5 – Who It’s For */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Who It’s For</h2>
                        <p className="text-xl text-grey-600 leading-relaxed">
                            <BrandName /> is for small businesses, food vendors, creators, service providers—anyone ready to stop renting space on someone else’s platform and start building equity in their own.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 6 – Call to Action */}
            <section className="py-16 md:py-24 bg-brand-700 text-white">
                <div className="container mx-auto px-6 lg:px-[8vw]">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Ready to Own Your Platform?</h2>
                        <p className="text-xl leading-relaxed mb-8">
                            If you're ready to keep more of what you earn, take full control of your operations, and build something sustainable—<strong className="font-semibold">we're ready to help.</strong>
                        </p>
                        <Link 
                            to="/catalog" 
                            className="inline-block bg-white text-brand-700 py-4 px-10 rounded-lg text-lg font-bold font-poppins hover:bg-brand-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
