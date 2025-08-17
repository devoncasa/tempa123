import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { SEO_CONTENT } from '../src/content';

const KeyTakeaways: React.FC<{ takeaways: string[] }> = ({ takeaways }) => (
    <div className="bg-bg-card p-6 rounded-lg border-2 border-brand-900 mt-12 mb-12">
        <h3 className="font-poppins font-bold text-xl text-text-primary mb-3">Key Takeaways</h3>
        <ul className="space-y-2">
            {takeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span id={`blog-summary-${index}`} className="text-text-secondary">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const BlogPage: React.FC = () => {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Blog & Resources | Tempa Web.123",
    "author": {
      "@type": "Organization",
      "name": "Tempa Web.123"
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "image": "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/about/performance-engine.webp",
    "description": "Our blog is coming soon! Stay tuned for articles on design trends, creator spotlights, and tips for making the most of your template.",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#blog-title", "#blog-summary"]
    }
  };

  return (
    <>
      <Seo
        title={SEO_CONTENT.BLOG.title}
        description={SEO_CONTENT.BLOG.description}
        schema={blogPostingSchema}
      />
      <section className="bg-bg-section-dark py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-[8vw]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 id="blog-title" className="text-4xl md:text-5xl font-bold text-brand-900 font-poppins mb-4">
              Our Blog & Resources
            </h1>
            <p id="blog-summary" className="text-lg text-grey-600 mb-12">
              Design trends, creator spotlights, and tips for making the most of your template.
            </p>

            <KeyTakeaways takeaways={[
              "Our blog will focus on actionable advice for small businesses and creators.",
              "Topics include design trends, SEO tips, and spotlights on successful template users.",
              "The goal is to provide resources that help you grow your business using our templates."
            ]} />

            <div className="bg-white p-10 rounded-lg shadow-lg text-center border-2 border-brand-900">
                <h2 className="text-2xl font-poppins font-bold text-grey-900">Coming Soon!</h2>
                <p className="text-grey-600 mt-4 mb-8">
                    We're currently curating our first batch of articles. Stay tuned for insightful content that will help you succeed.
                </p>
                <Link to={SITE_MAP.CATALOG} className="bg-primary text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-primary-hover transition-all duration-300">
                    Explore Templates
                </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;