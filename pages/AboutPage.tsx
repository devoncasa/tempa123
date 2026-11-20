import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { QuoteWorkshop } from './CustomizationServicesPage';

export default function AboutPage() {
  return <QuoteWorkshop>
    <Seo title="รู้จัก Tempa123 | แบบเว็บไซต์และบริการปรับแต่งสำหรับธุรกิจ" description="รู้จักวิธีทำงานของ Tempa123 ตั้งแต่เลือกแบบเว็บไซต์ วางเส้นทางให้ลูกค้า ไปจนถึงตกลงขอบเขตงานก่อนเริ่มออกแบบ" schema={{'@context':'https://schema.org','@type':'AboutPage',name:'รู้จัก Tempa123',inLanguage:'th'}} />
    <h1>รู้จัก Tempa123</h1>
    <p className="quote-lead">เราเป็นสตูดิโอเว็บไซต์ในกรุงเทพฯ ที่ช่วยเจ้าของธุรกิจเลือกแบบและปรับเว็บไซต์ให้เข้ากับวิธีขายของตัวเอง ร้านอาหารอาจอยากให้คนเห็นเมนูแล้วสั่งผ่าน LINE ส่วนธุรกิจบริการอาจต้องให้ลูกค้าดูผลงานก่อนขอราคา จุดเริ่มต้นของแต่ละเว็บจึงต่างกัน</p>
    <div className="quote-columns">
      <article className="quote-card"><h2>เริ่มจากคนที่เข้ามาใช้เว็บ</h2><p>ลองเล่าให้เราฟังว่าลูกค้าของคุณเป็นใคร เขามักถามอะไร และหลังอ่านจบคุณอยากให้เขาทำอะไร เราจะใช้คำตอบนั้นช่วยเลือกหน้าแรก ลำดับเนื้อหา และจุดติดต่อที่เหมาะกับร้าน</p><Link className="quote-text" to={SITE_MAP.CATALOG}>ดูแบบเว็บไซต์ที่เข้ากับธุรกิจ</Link></article>
      <aside className="quote-summary"><h2>คุยให้ชัดก่อนเริ่มงาน</h2><p>จดหน้าที่ต้องใช้ รูปหรือข้อความที่มีอยู่ และวันที่อยากเปิดเว็บ ถ้ายังเลือกแบบไม่ได้ ส่งตัวอย่างเว็บที่ชอบพร้อมบอกว่าส่วนไหนตรงใจก็ได้</p><Link className="quote-cta" to={SITE_MAP.CONTACT}>เล่าเรื่องธุรกิจของคุณ</Link></aside>
    </div>
  </QuoteWorkshop>;
}
