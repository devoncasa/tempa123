import React, { useEffect } from 'react';
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

const backgroundImages = [
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-001.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-002.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-003.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-004.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-005.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-006.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-007.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-008.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-009.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-010.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-011.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-012.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-013.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-014.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-015.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-016.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-017.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-018.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-019.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-020.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-021.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-022.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-023.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-024.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-025.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-026.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-027.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-028.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-029.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-030.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-031.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-032.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-033.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-034.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-035.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-036.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-037.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-038.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-039.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-040.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-041.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-042.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-043.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-044.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-045.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-046.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-047.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-048.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-049.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-050.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-051.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-052.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-053.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-054.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-055.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-056.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-057.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-058.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-059.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-060.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-061.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-062.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-063.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-064.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-065.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-066.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-067.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-068.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-069.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-070.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-071.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-072.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-073.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-074.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-075.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-076.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-077.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-078.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-079.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-080.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-081.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-082.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-083.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-084.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-085.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-086.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-087.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-088.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-089.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-090.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-091.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-092.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-093.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-094.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-095.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-096.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-097.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-098.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-099.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-100.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-101.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-102.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-103.jpeg", "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-104.jpeg",
    "https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/section-background/tempa123-section-background-light-105.jpeg"
];

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
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const body = document.body;
    let styleElement = document.getElementById('parallax-bg-style');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'parallax-bg-style';
        document.head.appendChild(styleElement);
    }

    if (isHomePage) {
        body.classList.add('homepage');
        styleElement.innerHTML = ''; 
    } else {
        body.classList.remove('homepage');
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const randomImageUrl = backgroundImages[randomIndex];
        styleElement.innerHTML = `
            body:not(.homepage)::before {
                background-image: url('${randomImageUrl}');
            }
        `;
    }
    
    return () => {
        body.classList.remove('homepage');
    };
  }, [isHomePage, location.pathname]);


  return (
    <>
      <ScrollToTop />
      <WelcomePopup />
      {user.isAdmin && <AdminPortal />}
      <div className={`flex flex-col min-h-screen ${isHomePage ? 'bg-bg-primary' : 'bg-transparent'} font-inter text-text-primary ${user.isAdmin ? 'blur-sm brightness-50' : ''}`}>
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
            <Route path="/inspiration-gallery/category/:category" element={<ProtectedGalleryRoute><CategoryGalleryPage /></ProtectedGalleryRoute>} />
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