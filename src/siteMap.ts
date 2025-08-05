// src/siteMap.ts

// Centralized routing constants for the entire application.
// This allows for easy updates and prepares the app for future features like i18n routing.
export const SITE_MAP = {
  HOME: '/',
  ABOUT: '/about',
  WHY_US: '/why-us',
  CATALOG: '/catalog',
  CATALOG_CATEGORY: '/catalog/:category',
  INSPIRATION_GALLERY: '/inspiration-gallery',
  INSPIRATION_GALLERY_CATEGORY: '/inspiration-gallery/category/:category',
  INSPIRATION_GALLERY_UPSELL: '/inspiration-gallery/upgrade',
  PRICING: '/pricing',
  PRICING_CUSTOMIZATION: '/pricing/customization-services',
  PRICING_CALCULATOR: '/pricing-calculator',
  LINE_ORDERING_KIT: '/line-ordering-kit',
  SERVICES_MULTILINGUAL: '/services/multilingual-websites',
  BLOG: '/blog',
  CONTACT: '/contact',
  SUBMIT_TEMPLATE: '/submit-template',
  TEMPLATE_DETAIL: '/template/:id',
  MY_ACCOUNT: '/my-account',
  CHECKOUT: '/checkout/:id',
  VIDEO_GALLERY: '/videos',
  
  // Admin Portal Routes
  ADMIN_DASHBOARD: '/dashboard',
  ADMIN_TEMPLATES: '/templates',
  ADMIN_SUBMISSIONS: '/submissions',
  ADMIN_SALES: '/sales',
  ADMIN_SETTINGS: '/settings',
};

// Helper functions for generating paths for dynamic routes.
export const getCatalogCategoryPath = (category: string) => `/catalog/${encodeURIComponent(category)}`;
export const getTemplateDetailPath = (id: string) => `/template/${id}`;
export const getCheckoutPath = (id: string) => `/checkout/${id}`;
export const getInspirationCategoryPath = (category: string) => `/inspiration-gallery/category/${encodeURIComponent(category)}`;
