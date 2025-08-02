import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import CategoryGalleryPage from './pages/CategoryGalleryPage';
import GalleryUpsellPage from './pages/GalleryUpsellPage';
import MyAccountPage from './pages/MyAccountPage';

const ProtectedGalleryRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user.isAuthenticated || user.packageTier === 'none') {
    return <Navigate to="/inspiration-gallery/upgrade" replace />;
  }
  return <>{children}</>;
};

const ProtectedAuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    if (!user.isAuthenticated) {
        return <Navigate to="/" replace />;
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
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:category" element={<CatalogPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/pricing/customization-services" element={<CustomizationServicesPage />} />
            <Route path="/pricing-calculator" element={<PricingCalculatorPage />} />
            <Route path="/line-ordering-kit" element={<LineOrderingKitPage />} />
            <Route path="/services/multilingual-websites" element={<MultilingualServicePage />} />
            
            <Route path="/inspiration-gallery" element={<ProtectedGalleryRoute><InspirationGalleryPage /></ProtectedGalleryRoute>} />
            <Route path="/gallery/:category" element={<ProtectedGalleryRoute><CategoryGalleryPage /></ProtectedGalleryRoute>} />
            <Route path="/inspiration-gallery/upgrade" element={<GalleryUpsellPage />} />
            
            <Route path="/my-account" element={<ProtectedAuthRoute><MyAccountPage /></ProtectedAuthRoute>} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/submit-template" element={<SubmitPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/template/:id" element={<TemplateDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
