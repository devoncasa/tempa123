



import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import TemplateDetailPage from './pages/TemplateDetailPage';
import SubmitPage from './pages/SubmitPage';
import PricingPage from './pages/PricingPage';
import CustomizationServicesPage from './pages/CustomizationServicesPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './contexts/AuthContext';
import AdminPortal from './components/AdminPortal';
import MultilingualServicePage from './pages/MultilingualServicePage';
import WhyUsPage from './pages/WhyUsPage';
import WelcomePopup from './components/WelcomePopup';
import LineOrderingKitPage from './pages/LineOrderingKitPage';
import ScrollToTop from './components/ScrollToTop';
import PricingCalculatorPage from './pages/PricingCalculatorPage';
import InspirationGalleryPage from './pages/InspirationGalleryPage';
import GalleryUpsellPage from './pages/GalleryUpsellPage';
import MyAccountPage from './pages/MyAccountPage';
import CategoryGalleryPage from './pages/CategoryGalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import CheckoutPage from './src/pages/CheckoutPage';

import { SITE_MAP } from './src/siteMap';

const ProtectedGalleryRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user.isAuthenticated || user.packageTier === 'none') {
    return <Navigate to={SITE_MAP.INSPIRATION_GALLERY_UPSELL} replace />;
  }
  return <>{children}</>;
};

const ProtectedAuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    if (!user.isAuthenticated) {
        return <Navigate to={SITE_MAP.HOME} replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <WelcomePopup />
      {user.isAdmin && <AdminPortal />}
      <div className={`flex flex-col min-h-screen bg-bg-primary font-inter text-text-primary ${user.isAdmin ? 'blur-sm brightness-50' : ''}`}>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path={SITE_MAP.HOME} element={<HomePage />} />
            <Route path={SITE_MAP.CATALOG} element={<CatalogPage />} />
            <Route path={SITE_MAP.CATALOG_CATEGORY} element={<CatalogPage />} />
            <Route path={SITE_MAP.WHY_US} element={<WhyUsPage />} />
            <Route path={SITE_MAP.PRICING} element={<PricingPage />} />
            <Route path={SITE_MAP.PRICING_CUSTOMIZATION} element={<CustomizationServicesPage />} />
            <Route path={SITE_MAP.PRICING_CALCULATOR} element={<PricingCalculatorPage />} />
            <Route path={SITE_MAP.LINE_ORDERING_KIT} element={<LineOrderingKitPage />} />
            <Route path={SITE_MAP.SERVICES_MULTILINGUAL} element={<MultilingualServicePage />} />
            
            <Route path={SITE_MAP.INSPIRATION_GALLERY} element={<ProtectedGalleryRoute><InspirationGalleryPage /></ProtectedGalleryRoute>} />
            <Route path={SITE_MAP.INSPIRATION_GALLERY_CATEGORY} element={<ProtectedGalleryRoute><CategoryGalleryPage /></ProtectedGalleryRoute>} />
            <Route path={SITE_MAP.INSPIRATION_GALLERY_UPSELL} element={<GalleryUpsellPage />} />
            
            <Route path={SITE_MAP.MY_ACCOUNT} element={<ProtectedAuthRoute><MyAccountPage /></ProtectedAuthRoute>} />

            <Route path={SITE_MAP.BLOG} element={<BlogPage />} />
            <Route path={SITE_MAP.VIDEO_GALLERY} element={<VideoGalleryPage />} />
            <Route path={SITE_MAP.ABOUT} element={<AboutPage />} />
            <Route path={SITE_MAP.SUBMIT_TEMPLATE} element={<SubmitPage />} />
            <Route path={SITE_MAP.CONTACT} element={<ContactPage />} />
            <Route path={SITE_MAP.TEMPLATE_DETAIL} element={<TemplateDetailPage />} />
            <Route path={SITE_MAP.CHECKOUT} element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;