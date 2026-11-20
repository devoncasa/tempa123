import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { TEMPLATES } from '../constants';
import { SITE_MAP, getCatalogCategoryPath, getTemplateDetailPath } from '../src/siteMap';
import { TemplateCategory } from '../types';
import './EditorialHome.css';

const collections = [
  { genre: 'clay', label: 'งานคราฟต์', category: TemplateCategory.ARTISAN, id: 'artisan-1', poster: ['Form', '& clay'], caption: 'รูปทรงและพื้นผิว', note: 'ให้ชิ้นงานเป็นจุดเด่น วางรายละเอียดวัสดุและเรื่องราวของคนทำไว้ใกล้กัน' },
  { genre: 'pool', label: 'สุขภาพและสปา', category: TemplateCategory.WELLNESS, id: 'wellness-4', poster: ['Still', 'water'], caption: 'จังหวะที่ผ่อนคลาย', note: 'ให้ลูกค้าเห็นบรรยากาศ เปรียบเทียบบริการ และหาช่องทางนัดหมายได้ง่าย' },
  { genre: 'fruit', label: 'อาหารและคาเฟ่', category: TemplateCategory.FOOD, id: 'wellness-17', poster: ['Fresh', 'press'], caption: 'สีสันของวัตถุดิบ', note: 'ให้เมนูอ่านง่าย เล่าเรื่องวัตถุดิบ และวางช่องทางสั่งซื้อไว้ใกล้รายการอาหาร' },
].filter(item => TEMPLATES.some(template => template.category === item.category && template.id === item.id));

export default function HomePage() {
  const [selected, setSelected] = useState(0);
  const scene = collections[selected];

  return (
    <div className="editorial-home" lang="th">
      <Seo title="แบบเว็บไซต์สำหรับธุรกิจและบริการปรับแต่ง | Tempa123" description="เลือกแบบเว็บไซต์ตามประเภทธุรกิจ ดูบริการปรับแต่ง และคุยกับ Tempa123 เรื่องเนื้อหา ฟังก์ชัน และงบประมาณที่เหมาะกับงานของคุณ" />
      <section className="eh-hero">
        <div className="eh-intro">
          <p className="eh-overline">แบบเว็บไซต์และบริการปรับแต่ง</p>
          <h1>เว็บไซต์ที่ใช่<br /><em>เริ่มจากแบบ</em><br />ที่คุณชอบ</h1>
          <p className="eh-lead">เลือกแบบที่เข้ากับธุรกิจของคุณ แล้วคุยกันว่าจะปรับหน้าตา เนื้อหา และฟังก์ชันอย่างไรให้ลูกค้าใช้งานได้สะดวก</p>
          <div className="eh-actions">
            <Link className="eh-button" to="/design-finder">ช่วยเลือกแบบให้ฉัน</Link>
            <Link className="eh-link" to={SITE_MAP.CATALOG}>เลือกดูทุกแบบ</Link>
            <Link className="eh-link" to={SITE_MAP.PRICING_CUSTOMIZATION}>ดูบริการปรับแต่ง</Link>
          </div>
        </div>
        {scene && <div className="eh-studio">
          <div role="group" className="eh-tabs" aria-label="เลือกแนวทางตามประเภทธุรกิจ">
            {collections.map((item, i) => <button type="button" key={item.genre} aria-pressed={i === selected} aria-controls="eh-work" onClick={() => setSelected(i)}>{item.label}</button>)}
          </div>
          <div id="eh-work" aria-live="polite" aria-atomic="true">
            <div className={'eh-poster eh-' + scene.genre} aria-hidden="true">
              <div className="eh-poster-title" lang="en">{scene.poster[0]}<br /><i>{scene.poster[1]}</i></div>
              <div className="eh-art"><i /><i /><i /></div><span className="eh-poster-foot">{scene.caption}</span>
            </div>
            <div className="eh-caption"><p>ภาพแนวคิดสำหรับธุรกิจ{scene.label}</p><Link to={getCatalogCategoryPath(scene.category)}>ดูแบบในหมวดนี้</Link></div>
          </div>
        </div>}
      </section>
      <section className="eh-index" aria-labelledby="eh-index-title">
        <div className="eh-section-heading"><h2 id="eh-index-title">แบบไหนเข้ากับธุรกิจคุณ?</h2><Link className="eh-link" to={SITE_MAP.CATALOG}>ดูแบบทั้งหมด</Link></div>
        <div className="eh-entries">{collections.map(item => {
          const template = TEMPLATES.find(record => record.id === item.id)!;
          return <Link key={item.id} className={'eh-entry eh-entry-' + item.genre} to={getTemplateDetailPath(item.id)}>
            <p className="eh-entry-category">{item.label}</p>
            <h3 lang="en">{template.name}</h3><p>{item.note}</p><span className="eh-entry-more">ดูรายละเอียดแบบ</span>
          </Link>;
        })}</div>
      </section>
      <section className="eh-brief">
        <figure className="eh-process">
          <img src="/media/design-workshop-480.webp" srcSet="/media/design-workshop-480.webp 480w, /media/design-workshop-960.webp 960w" sizes="(max-width: 780px) 90vw, (max-width: 1650px) 38vw, 620px" width={960} height={640} loading="lazy" decoding="async" alt="ภาพประกอบการเทียบองค์ประกอบหน้าเว็บ สี และพื้นผิวบนโต๊ะออกแบบ" />
          <figcaption>ภาพประกอบแนวทางการปรับแบบเว็บไซต์</figcaption>
        </figure>
        <div><h2>มีไอเดียในใจแล้ว?</h2><p>เล่าว่าคุณทำธุรกิจอะไร และอยากให้ลูกค้าทำอะไรบนเว็บไซต์ เราจะช่วยดูว่าแบบไหนเหมาะและต้องปรับตรงไหนบ้าง</p><div className="eh-actions"><Link className="eh-button" to={SITE_MAP.CONTACT}>คุยเรื่องเว็บไซต์ของคุณ</Link><Link className="eh-link" to={SITE_MAP.PRICING_CALCULATOR}>ลองประเมินงบ</Link></div></div>
      </section>
    </div>
  );
}
