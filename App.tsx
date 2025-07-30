
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <AdminPortal />}
      <div className={`flex flex-col min-h-screen bg-bg-primary font-inter text-base-text ${isAuthenticated ? 'blur-sm brightness-50' : ''}`}>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:category" element={<CatalogPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/pricing/customization-services" element={<CustomizationServicesPage />} />
            <Route path="/services/multilingual-websites" element={<MultilingualServicePage />} />
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