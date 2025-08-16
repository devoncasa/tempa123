import React from 'react';
import { Link } from 'react-router-dom';
import BrandName from '../components/BrandName';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { ASSETS } from '../src/assets';
import { SEO_CONTENT } from '../src/content';

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

const KeyTakeaways: React.FC<{ takeaways: string[] }> = ({ takeaways }) => (
    <div className="bg-bg-card p-6 rounded-lg border-l-4 border-primary">
        <h3 className="font-poppins font-bold text-xl text-text-primary mb-3">Key Takeaways</h3>
        <ul className="space-y-2">
            {takeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-text-secondary">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


const AboutPage: React.FC = () => {
    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage"
    };
    
    return (
        <>
            <Seo
                title={SEO_CONTENT.ABOUT.title}
                description={SEO_CONTENT.ABOUT.description}
                schema={aboutPageSchema}
            />
            <div className="text-base-text font-inter">
                {/* SECTION 1 – Hero Header */}
                <section className="py-16 md:py-24 bg-bg-section-dark">
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
                                <img src={ASSETS.ABOUT_PAGE.HERO} alt="Ambitious small business owner in their shop" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </section>
                
                 {/* Key Takeaways Section */}
                <section className="py-16 md:py-24 bg-bg-section-light">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <KeyTakeaways takeaways={[
                            "We provide high-performance website templates to help small businesses avoid high commission fees from third-party platforms.",
                            "Our mission is to empower business owners to own their digital presence, control customer relationships, and maximize profits.",
                            "Templates are designed for performance, SEO, and ease of use, providing a sustainable alternative to renting online space."
                        ]} />
                    </div>
                </section>

                {/* SECTION 2 – Why We Exist */}
                <section className="py-16 md:py-24 bg-bg-section-dark">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <img src={ASSETS.ABOUT_PAGE.WHY_WE_EXIST} alt="Business owner working on a laptop in a cafe" className="rounded-lg shadow-xl w-full h-auto object-cover" />
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

                {/* Founder's Journey Section */}
                <section className="py-16 md:py-24 bg-bg-section-light">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="grid md:grid-cols-3 gap-12 items-center">
                             <div className="md:col-span-1 flex justify-center">
                                <img src={ASSETS.ABOUT_PAGE.FOUNDER} alt="Founder of Tempa Web.123" className="rounded-full shadow-xl w-48 h-48 md:w-64 md:h-64 object-cover" />
                            </div>
                            <div className="md:col-span-2">
                                <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Our Founder's Journey</h2>
                                <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                    "Living in Bangkok, I was constantly inspired by the creativity of street food vendors and local artisans. But I also saw their frustration. They would work incredibly hard, only to see a huge chunk of their earnings disappear into the pockets of delivery apps. They were essentially renting their own customers."
                                </p>
                                <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                    "I knew there had to be a better way. I started <BrandName /> based on a simple idea: what if these entrepreneurs could own their platform? What if they had a website that was not just beautiful, but a powerful, commission-free tool to connect directly with their audience? That firsthand experience is the 'why' behind everything we build."
                                </p>
                                <p className="font-lora text-2xl text-grey-800 mt-6">- Devon, Founder</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* SECTION 3 – What We Offer */}
                <section className="py-16 md:py-24 bg-bg-section-dark">
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
                                <img src={ASSETS.ABOUT_PAGE.WHAT_WE_OFFER} alt="Website mockup on a phone and tablet showing direct customer access" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4 – Explore Before You Commit */}
                <section className="py-16 md:py-24 bg-bg-section-light">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Explore Before You Commit</h2>
                            <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                One of the biggest advantages we offer is that you can fully explore how your website will look and function—before you build it. Browse a wide range of professionally designed templates, each with full menus, layouts, and ordering features already activated for preview.
                            </p>
                            <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                Whether you’re in food, retail, services, or creative work, there’s likely a template that fits your business.
                            </p>
                            <p className="text-lg text-grey-600 leading-relaxed">
                                Can’t find your industry or product category? No problem—reach out for a friendly consultation, and we’ll gladly recommend the right solution or design it with you.
                            </p>
                             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to={SITE_MAP.CATALOG}
                                    className="inline-block bg-primary text-white py-3 px-8 rounded-lg text-base font-semibold font-poppins hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    Browse Our Catalog
                                </Link>
                                <Link
                                    to={SITE_MAP.CONTACT}
                                    className="inline-block bg-transparent border-2 border-brand-700 text-brand-700 py-3 px-8 rounded-lg text-base font-semibold font-poppins hover:bg-brand-100 transition-all duration-300 transform hover:scale-105"
                                >
                                    Request a Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5 – Engineered for Performance */}
                <section className="py-16 md:py-24 bg-bg-section-dark">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <img src={ASSETS.ABOUT_PAGE.PERFORMANCE_ENGINE} alt="Graph showing performance and speed increase" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                            </div>
                            <div className="order-1 md:order-2">
                                <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Engineered for Performance</h2>
                                <p className="text-lg text-grey-600 leading-relaxed mb-4">
                                    Our templates are designed with clean, optimized code for fast loading and strong SEO performance. Whether viewed on phone or desktop, the ordering experience is seamless, intuitive, and reliable.
                                </p>
                                <p className="text-lg text-grey-600 leading-relaxed font-semibold italic">
                                    This is not just about having a website—it’s about owning a digital asset that performs efficiently and works for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* SECTION 6 – Who It’s For */}
                <section className="py-16 md:py-24 bg-bg-section-light">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-grey-900 mb-6">Who It’s For</h2>
                            <p className="text-xl text-grey-600 leading-relaxed">
                                <BrandName /> is for small businesses, food vendors, creators, service providers—anyone ready to stop renting space on someone else’s platform and start building equity in their own.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 7 – Call to Action */}
                <section className="py-16 md:py-24 bg-brand-700 text-white">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Ready to Own Your Platform?</h2>
                            <p className="text-xl leading-relaxed mb-8">
                                If you're ready to keep more of what you earn, take full control of your operations, and build something sustainable—<strong className="font-semibold">we're ready to help.</strong>
                            </p>
                            <Link 
                                to={SITE_MAP.CATALOG} 
                                className="inline-block bg-white text-brand-700 py-4 px-10 rounded-lg text-lg font-bold font-poppins hover:bg-brand-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;