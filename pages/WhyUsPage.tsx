import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { QuoteWorkshop } from './CustomizationServicesPage';

export default function WhyUsPage() {
  return <QuoteWorkshop>
    <Seo title="เลือกวิธีทำเว็บไซต์ให้เหมาะกับธุรกิจ | Tempa123" description="เปรียบเทียบการเริ่มจากแบบเว็บไซต์ การจ้างปรับให้เข้ากับแบรนด์ และการออกแบบเฉพาะ พร้อมรายการที่ควรตกลงก่อนขอราคา" />
    <h1>ธุรกิจของคุณควรเริ่มทำเว็บแบบไหน?</h1>
    <p className="quote-lead">ลองเริ่มจากงานที่ต้องทำจริงในแต่ละวัน ถ้าลูกค้าต้องการดูผลงานแล้วโทรหา หน้าเว็บไม่กี่หน้าก็อาจเพียงพอ แต่ถ้าต้องเลือกสินค้า จองเวลา หรือเชื่อมระบบหลังร้าน ควรคุยรายละเอียดกันตั้งแต่แรก</p>
    <div className="quote-grid">
      <article className="quote-card"><h2>มีเนื้อหาพร้อมแล้ว</h2><p>ลองเลือกแบบที่มีลำดับหน้าใกล้กับงานของคุณ เช่น มีส่วนแสดงผลงาน เมนู หรือช่องทางติดต่อ แล้วจดจุดที่ต้องเปลี่ยน</p><Link className="quote-text" to={SITE_MAP.CATALOG}>เปรียบเทียบแบบเว็บไซต์</Link></article>
      <article className="quote-card"><h2>อยากให้เว็บเป็นแบรนด์ของตัวเอง</h2><p>เตรียมโลโก้ สี รูปจริง และตัวอย่างงานที่ชอบ แล้วเลือกว่าอยากให้ทีมช่วยเฉพาะหน้าตา หรือช่วยจัดเนื้อหาและเมนูด้วย</p><Link className="quote-text" to={SITE_MAP.PRICING_CUSTOMIZATION}>ดูบริการปรับแต่ง</Link></article>
      <article className="quote-card"><h2>ต้องต่อกับระบบที่ใช้อยู่</h2><p>บอกชื่อระบบและเล่าตัวอย่างหนึ่งออเดอร์ตั้งแต่ต้นจนจบ เพื่อให้ทีมตรวจว่าต้องเชื่อมข้อมูลส่วนไหนและประเมินงานให้ตรง</p><Link className="quote-text" to={SITE_MAP.CONTACT}>ส่งโจทย์ให้ทีมดู</Link></article>
    </div>
    <aside className="quote-note"><h2>ก่อนตกลงราคา</h2><p>เช็กจำนวนหน้า ผู้รับผิดชอบรูปและเนื้อหา จำนวนรอบแก้ไข ค่าโดเมนและโฮสติ้ง รวมถึงสิทธิ์เข้าไปแก้เว็บไซต์หลังส่งมอบ ให้รายละเอียดเหล่านี้อยู่ในใบเสนอราคาเดียวกัน</p></aside>
  </QuoteWorkshop>;
}
