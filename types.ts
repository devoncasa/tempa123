
import React from 'react';

export enum TemplateCategory {
  JEWELRY = 'Jewelry & Beads',
  FOOD = 'Food & Café',
  WELLNESS = 'Wellness & Spa',
  PORTFOLIO = 'Portfolio & Personal Branding',
  COACHES = 'Coaches & Mentors',
  ARTISAN = 'Artisan & Handmade',
  ECOMMERCE = 'E-commerce & Retail',
  REAL_ESTATE = 'Real Estate',
  EVENTS = 'Events & Weddings',
  TECH = 'Technology & Startups',
  EDUCATION = 'Education & Online Courses',
  NON_PROFIT = 'Non-Profit & Charity',
  FITNESS = 'Health & Fitness',
  TRAVEL = 'Travel & Tourism',
  AGENCY = 'Creative Agencies',
  PHOTOGRAPHY = 'Photography',
  HOME_SERVICES = 'Home Services',
  AUTOMOTIVE = 'Automotive & Car Services',
  FASHION = 'Fashion & Apparel',
  BEAUTY = 'Beauty & Cosmetics',
  LEGAL = 'Legal Services & Law Firms',
  FINANCE = 'Financial Services & Consulting',
  CONSTRUCTION = 'Construction & Architecture',
  ENTERTAINMENT = 'Entertainment & Nightlife',
  MUSIC = 'Music & Bands',
  PET_CARE = 'Pet Care & Veterinary',
  MARKETING = 'Marketing & Advertising',
  BLOG = 'Blog & Magazine',
  MEDICAL = 'Medical & Healthcare',
  CHILDCARE = 'Childcare & Education',
}


export interface ColorTheme {
  name: string;
  palette: string[];
}

export interface FontSet {
  name: string;
  fonts: string[];
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  tagline: string;
  description: string;
  styleDescription: string;
  features: string[];
  necessaryMenu: string[];
  priceRange: [number, number];
  imageUrl: string;
  gallery: string[];
  colorThemes: ColorTheme[];
  fontOptions: FontSet[];
  layoutVariations: string[];
  isDynamic: boolean;
  hasShopPage: boolean;
}

export interface CategoryInfo {
  name: TemplateCategory;
  icon: React.ReactNode;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface PricingTier {
  title: string;
  priceRange: string;
  features: string[];
}

export interface Addon {
    name: string;
    price: string;
}

export interface ServicePackage {
    id: number;
    name: string;
    price_thb: number;
    price_usd_approx: number;
    keyFeatures: string[];
    description: string;
    isCustom?: boolean;
    modal: {
        title: string;
        basePriceText: string;
        included: string[];
        addons: Addon[];
        customText?: string;
    };
}

export interface CalculatorAddon {
  id: string;
  name: string;
  price_thb: number;
  description: string;
  isCountable: boolean;
  unitName?: string; // e.g., 'page', 'post', 'batch of 10'
}

export interface CalculatorPackage {
  id: number;
  name: string;
  price_thb: number;
  description: string;
  addonIds: string[];
}
