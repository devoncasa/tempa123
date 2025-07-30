import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  schema?: object;
}

const Seo: React.FC<SeoProps> = ({ title, description, schema }) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Remove old schema script if it exists to prevent duplicates on navigation
    const oldScript = document.getElementById('page-schema');
    if (oldScript) {
        oldScript.remove();
    }

    // Add new schema script
    if (schema) {
      const script = document.createElement('script');
      script.id = 'page-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
        const script = document.getElementById('page-schema');
        if (script) {
            script.remove();
        }
    }
  }, [title, description, schema]);

  return null;
};

export default Seo;
