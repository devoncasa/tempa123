import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';

export const serviceScopes = [
  { name: 'ปรับแบบให้เข้ากับแบรนด์', detail: 'สำหรับธุรกิจที่มีโลโก้และภาพอยู่แล้ว อยากให้สี ตัวอักษร และภาพหน้าแรกไปในทิศทางเดียวกัน', prepare: 'โลโก้ สีประจำแบรนด์ และเว็บไซต์ตัวอย่างที่ชอบ' },
  { name: 'จัดหน้าเว็บพร้อมเปิดตัว', detail: 'สำหรับธุรกิจที่เตรียมข้อมูลไว้แล้ว และต้องการคนช่วยวางหน้าแนะนำธุรกิจ บริการ และช่องทางติดต่อ', prepare: 'รายชื่อหน้าที่ต้องใช้ เนื้อหาคร่าวๆ และช่องทางติดต่อ' },
  { name: 'วางเนื้อหาและบทความ', detail: 'สำหรับเว็บไซต์ที่มีหลายบริการหรือหลายบทความ และต้องการให้ลูกค้าหาเรื่องที่สนใจได้ง่าย', prepare: 'รายการเนื้อหา หมวดหมู่ และเรื่องที่ลูกค้าถามบ่อย' },
  { name: 'เริ่มต้นร้านค้าออนไลน์', detail: 'สำหรับร้านที่อยากนำสินค้าออกมาให้ลูกค้าเลือกดูและส่งคำถามถึงร้านได้สะดวก', prepare: 'ตัวอย่างสินค้า ภาพถ่าย และวิธีรับออเดอร์ในปัจจุบัน' },
  { name: 'ขยายระบบร้านค้า', detail: 'สำหรับร้านที่ต้องจัดการตัวเลือกสินค้า การชำระเงิน หรือการจัดส่งหลายรูปแบบ', prepare: 'รายการตัวเลือกสินค้าและขั้นตอนตั้งแต่รับเงินจนส่งของ' },
  { name: 'ออกแบบตามโจทย์เฉพาะ', detail: 'สำหรับงานที่ใช้แบบสำเร็จรูปเพียงอย่างเดียวได้ยาก เช่น เว็บไซต์หลายภาษาหรืองานที่ต้องเชื่อมต่อระบบเดิม', prepare: 'ปัญหาที่อยากแก้ ระบบที่ใช้อยู่ และวันที่ต้องการเปิดเว็บ' },
];

export function scopeUrl(path: string, scope?: string, template?: string, addons?: string[]) {
  const query = new URLSearchParams();
  if (scope) query.set('package', scope);
  if (template) query.set('template', template);
  if (addons?.length) query.set('addons', addons.join(', '));
  return query.size ? path + '?' + query.toString() : path;
}

// Keep these lead-first pages readable before third-party styles or fonts arrive.
const scopeStyles = `
.quote-workshop{--ink:#193f39;--rule:#c7c9b9;background:#f8f5ed;color:var(--ink);padding:clamp(2rem,6vw,6rem) max(5vw,calc((100vw - 1160px)/2));font-family:inherit;line-height:1.72}
.quote-workshop *{box-sizing:border-box}.quote-workshop h1,.quote-workshop h2,.quote-workshop h3,.quote-workshop p{margin:0}.quote-workshop h1{font-size:clamp(2.15rem,5vw,4.75rem);line-height:1.18;max-width:19ch;letter-spacing:-.025em;color:var(--ink)}
.quote-workshop h2{font-size:clamp(1.3rem,2.4vw,2rem);line-height:1.45;color:inherit}.quote-workshop h3{font-size:1.15rem}.quote-lead{max-width:66ch;margin:1.2rem 0 2rem!important;font-size:1.08rem}.quote-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2rem}.quote-card{background:#fffdf7;border:1px solid var(--rule);padding:clamp(1.2rem,3vw,2rem);display:flex;flex-direction:column;gap:.85rem;min-width:0}.quote-card h2{font-size:1.4rem}.quote-card p{color:#344c44}.quote-card .quote-cta{align-self:flex-start;margin-top:auto}
.quote-cta,.quote-text{font-weight:650}.quote-cta{display:inline-flex;align-items:center;min-height:44px;padding:.7rem 1.1rem;color:#fff!important;background:#164b42;text-decoration:none!important;border:1px solid #164b42;border-radius:2px}.quote-cta:hover{background:#0a392e}.quote-text{display:inline-block;padding:.5rem 0;color:#17584b!important;text-decoration:underline;text-underline-offset:.23em}.quote-workshop :focus-visible{outline:3px solid #ab4d17;outline-offset:3px}.quote-note{border-top:1px solid var(--rule);margin-top:2rem;padding-top:1.25rem;max-width:78ch}.quote-note p{margin:.6rem 0}
.quote-columns{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:start;gap:clamp(1rem,4vw,3.5rem)}.quote-form{display:grid;gap:1.25rem}.quote-form fieldset{margin:0;border:1px solid var(--rule);padding:1.2rem;min-width:0}.quote-form legend{font-size:1.3rem;font-weight:700;padding-right:.5rem}.quote-form select,.quote-form input[type=search]{display:block;background:#fff;color:var(--ink);width:100%;border:1px solid #7b8c80;padding:.65rem;margin:.3rem 0 .8rem;font:inherit}.quote-choice{display:flex;align-items:center;gap:.65rem;min-height:44px;cursor:pointer}.quote-choice input{width:1.15rem;height:1.15rem;accent-color:#164b42}.quote-summary{border:1px solid var(--rule);background:#e5ecdf;padding:clamp(1.2rem,3vw,2rem)}.quote-summary dl{margin:1rem 0}.quote-summary dt{font-weight:700;margin-top:.8rem}.quote-summary dd{margin:0}.quote-summary .quote-cta{margin-top:.9rem}.quote-workshop details{padding:.8rem 0;border-top:1px solid var(--rule)}.quote-workshop summary{font-weight:650;cursor:pointer}.quote-workshop details p{margin:.6rem 0}.quote-workshop a{overflow-wrap:anywhere}
@media(max-width:800px){.quote-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.quote-columns{grid-template-columns:1fr}}
@media(max-width:550px){.quote-grid{grid-template-columns:1fr}.quote-workshop{padding-inline:1.1rem}}
`;

export const QuoteWorkshop = ({ children }: { children: React.ReactNode }) => (
  <section className="quote-workshop" lang="th"><style>{scopeStyles}</style>{children}</section>
);

export default function CustomizationServicesPage() {
  return <QuoteWorkshop>
    <Seo title="บริการปรับแต่งเว็บไซต์สำหรับธุรกิจ | Tempa123" description="เลือกงานที่ต้องการให้ช่วย ตั้งแต่ปรับแบรนด์และจัดหน้า ไปจนถึงร้านค้าออนไลน์ พร้อมดูสิ่งที่ควรเตรียมก่อนขอราคา" />
    <h1>ให้เราช่วยทำส่วนไหนของเว็บไซต์ดี?</h1>
    <p className="quote-lead">เลือกงานที่ใกล้กับสิ่งที่คุณต้องการที่สุด แล้วเล่าเรื่องธุรกิจให้ทีมฟัง เราจะใช้รายละเอียดนี้คุยเรื่องขอบเขตงาน ราคา และกำหนดส่งก่อนเริ่มงาน</p>
    <div className="quote-grid">{serviceScopes.map(scope => <article className="quote-card" key={scope.name}>
      <h2>{scope.name}</h2><p>{scope.detail}</p><p><strong>เตรียมไว้คุยกัน</strong><br />{scope.prepare}</p>
      <Link className="quote-cta" to={scopeUrl(SITE_MAP.CONTACT, scope.name)} aria-label={'สอบถามบริการ' + scope.name}>สอบถามบริการนี้</Link>
    </article>)}</div>
    <aside className="quote-note"><h2>ต้องใช้หลายบริการร่วมกัน?</h2><p>เลือกแบบเว็บไซต์และระบุส่วนที่ต้องการเพิ่ม เพื่อให้ทีมประเมินทั้งโครงการในครั้งเดียว</p><Link className="quote-text" to={SITE_MAP.PRICING_CALCULATOR}>เลือกขอบเขตงานเพื่อขอราคา</Link></aside>
  </QuoteWorkshop>;
}
