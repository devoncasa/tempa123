import React from 'react';
import {Link,Route,Routes,useParams} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { designLabel } from './components/TemplateCard';
import Seo from './components/Seo';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import DesignFinderPage from './pages/DesignFinderPage';
import TemplateDetailPage from './pages/TemplateDetailPage';
import CheckoutPage from './src/pages/CheckoutPage';
import PricingPage from './pages/PricingPage';
import CustomizationServicesPage from './pages/CustomizationServicesPage';
import PricingCalculatorPage from './pages/PricingCalculatorPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import WhyUsPage from './pages/WhyUsPage';
import BlogPage from './pages/BlogPage';
import LineOrderingKitPage from './pages/LineOrderingKitPage';
import { SITE_MAP as S } from './src/siteMap';

const pages = [[S.HOME,HomePage],[S.DESIGN_FINDER,DesignFinderPage],[S.CATALOG,CatalogPage],[S.CATALOG_CATEGORY,CatalogPage],[S.TEMPLATE_DETAIL,TemplateDetailPage],[S.CHECKOUT,CheckoutPage],[S.CONTACT,ContactPage],[S.PRICING,PricingPage],[S.PRICING_CUSTOMIZATION,CustomizationServicesPage],[S.PRICING_CALCULATOR,PricingCalculatorPage],[S.BLOG,BlogPage],[S.ABOUT,AboutPage],[S.WHY_US,WhyUsPage],[S.LINE_ORDERING_KIT,LineOrderingKitPage]] as const;
const servicePages = [
  [S.SERVICES_MULTILINGUAL,'ทำเว็บไซต์หลายภาษา','บอกเราว่าลูกค้าใช้ภาษาอะไร และหน้าไหนต้องแปลบ้าง เราจะช่วยวางโครงสร้างเมนูและขอบเขตการแปลให้เหมาะกับตลาดของคุณ','สอบถามงานหลายภาษา','/contact?package=เว็บไซต์หลายภาษา'],
  [S.INSPIRATION_GALLERY,'หาไอเดียให้เว็บไซต์','เลือกดูรูปแบบตามประเภทธุรกิจ แล้วนำแบบที่ชอบมาคุยกับทีม','เลือกแบบเว็บไซต์','/catalog'],
  [S.INSPIRATION_GALLERY_CATEGORY,'แบบเว็บไซต์ตามประเภทธุรกิจ','ดูตัวเลือกในแคตตาล็อกและเลือกแนวทางที่ต้องการ','ดูแคตตาล็อก','/catalog'],
  [S.INSPIRATION_GALLERY_UPSELL,'เลือกบริการสำหรับเว็บไซต์','เปรียบเทียบขอบเขตงานหรือสอบถามเรื่องสิทธิ์การใช้ไฟล์ก่อนตัดสินใจ','ดูบริการ','/pricing'],
  [S.MY_ACCOUNT,'สอบถามเรื่องบัญชีและไฟล์งาน','หากเคยรับบริการ แจ้งเลขอ้างอิงของงานผ่านแบบติดต่อเพื่อให้ทีมตรวจสอบ','ติดต่อทีมงาน','/contact'],
  [S.SUBMIT_TEMPLATE,'เสนอผลงานออกแบบ','ส่งรายละเอียดแนวทางและลิงก์ผลงานของคุณให้ทีมพิจารณา','เสนอผลงาน','/contact?package=เสนอผลงานออกแบบ'],
  [S.VIDEO_GALLERY,'ดูแนวทางออกแบบเว็บไซต์','เริ่มจากแบบที่เหมาะกับธุรกิจของคุณ แล้วสอบถามเพื่อดูตัวอย่างหรือคุยเรื่องการปรับแต่ง','ดูแบบเว็บไซต์','/catalog'],
] as const;
function Info({title,description,label,to}:{title:string;description:string;label:string;to:string}){
  const { category } = useParams();
  if (category) {
    const businessType = designLabel(category);
    title = 'ไอเดียเว็บไซต์สำหรับ' + businessType;
    description = 'ดูแนวทางจัดหน้าและเลือกชุดสีสำหรับ' + businessType + ' หรือนำรายละเอียดธุรกิจมาคุยกับทีมเพื่อเลือกแบบที่เหมาะกับงาน';
    label = 'ดูแบบในหมวดนี้';
    to = '/catalog/' + encodeURIComponent(category);
  }
  return <article className="studio-info"><Seo title={title+' | Tempa123'} description={description}/><h1>{title}</h1><p>{description}</p><Link className="studio-brief" to={to}>{label}</Link></article>
}
export default function App(){return <><ScrollToTop/><Header/><main id="main-content" tabIndex={-1}><Routes>
  {pages.map(([path,Page])=><Route key={path} path={path} element={<Page/>}/>)}
  {servicePages.map(([path,title,description,label,to])=><Route key={path} path={path} element={<Info {...{title,description,label,to}}/>}/>)}
  <Route path="*" element={<Info title="ไม่พบหน้านี้" description="กลับไปเลือกแบบเว็บไซต์หรือเริ่มจากหน้าแรก" label="เลือกแบบเว็บไซต์" to="/catalog"/>}/>
</Routes></main><Footer/></>}
