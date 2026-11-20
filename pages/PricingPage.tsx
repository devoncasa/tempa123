import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { QuoteWorkshop, scopeUrl } from './CustomizationServicesPage';

const offers = [
  { name: 'ใช้แบบเว็บไซต์', title: 'มีทีมทำเว็บอยู่แล้ว', text: 'เลือกแบบที่ตรงกับธุรกิจ แล้วสอบถามว่าได้รับไฟล์อะไร แก้ไขส่วนไหนได้บ้าง และสิทธิ์ใช้งานครอบคลุมกี่เว็บไซต์', action: 'สอบถามสิทธิ์ใช้แบบ' },
  { name: 'ปรับแบบให้เข้ากับแบรนด์', title: 'อยากให้ช่วยปรับแบบ', text: 'ใช้โครงหน้าเดิมเป็นจุดเริ่มต้น แล้วเลือกให้ทีมช่วยปรับสี ใส่ภาพ จัดวางเนื้อหา หรือตั้งค่าหน้าติดต่อ', action: 'สอบถามค่าปรับแต่ง' },
  { name: 'ออกแบบตามโจทย์เฉพาะ', title: 'มีโจทย์เฉพาะของธุรกิจ', text: 'เล่าว่าลูกค้าต้องทำอะไรบนเว็บ เช่น เลือกสินค้า ขอใบเสนอราคา หรืออ่านข้อมูลหลายภาษา เพื่อให้ทีมประเมินระบบที่ต้องใช้', action: 'คุยเรื่องโครงการ' },
];

export default function PricingPage() {
  return <QuoteWorkshop>
    <Seo title="ค่าทำเว็บไซต์และขอบเขตบริการ | Tempa123" description="เปรียบเทียบการใช้แบบเว็บไซต์ บริการปรับแต่ง และงานเฉพาะทาง พร้อมตรวจค่าใช้จ่ายครั้งแรกและรายปีก่อนขอใบเสนอราคา" />
    <h1>ค่าทำเว็บไซต์ขึ้นอยู่กับงานที่คุณเลือก</h1>
    <p className="quote-lead">บางธุรกิจต้องการแค่แบบไปทำต่อ บางธุรกิจอยากให้ช่วยจนพร้อมเปิดเว็บ เลือกแนวทางด้านล่างเพื่อสอบถามราคาให้ตรงกับงานของคุณ</p>
    <div className="quote-grid">{offers.map(offer => <article className="quote-card" key={offer.name}>
      <h2>{offer.title}</h2><p>{offer.text}</p><Link className="quote-cta" to={scopeUrl(SITE_MAP.CONTACT, offer.name)}>{offer.action}</Link>
    </article>)}</div>
    <div className="quote-note"><h2>ก่อนตกลงราคา ควรคุยเรื่องอะไรบ้าง?</h2>
      <details open><summary>ค่าแบบรวมกับค่าปรับแต่งไหม?</summary><p>แจ้งชื่อแบบที่สนใจและงานที่อยากให้ช่วย ทีมจะระบุในใบเสนอราคาว่าค่าแบบรวมอยู่แล้วหรือคิดแยก พร้อมขอบเขตสิทธิ์ใช้ไฟล์</p></details>
      <details><summary>หลังเปิดเว็บมีค่าใช้จ่ายอะไรอีก?</summary><p>โดเมน โฮสติ้ง และบริการภายนอกอาจมีค่าต่ออายุ ขึ้นอยู่กับระบบที่เลือก ควรให้ใบเสนอราคาแยกรายการที่จ่ายครั้งเดียวออกจากรายการที่ต้องจ่ายต่อเนื่อง</p></details>
      <details><summary>ต้องเตรียมอะไรเพื่อขอราคา?</summary><p>บอกประเภทธุรกิจ หน้าที่อยากมี แบบที่สนใจ และวันที่ต้องการเปิดเว็บ หากมีภาพหรือเนื้อหาพร้อมแล้ว แจ้งทีมได้เลย</p></details>
      <Link className="quote-text" to={SITE_MAP.PRICING_CALCULATOR}>เลือกแบบและระบุงานที่ต้องการ</Link>
    </div>
  </QuoteWorkshop>;
}
