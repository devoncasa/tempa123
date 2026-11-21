import React from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import TemplateCard, { designLabel } from '../components/TemplateCard';
import Seo from '../components/Seo';
import { SITE_MAP, getCatalogCategoryPath } from '../src/siteMap';

const categories = Array.from(new Set(TEMPLATES.map(item => item.category))).sort();
const styles = Array.from(new Set(TEMPLATES.flatMap(item => item.style ? [item.style] : []))).sort();
const selectClass = 'w-full border border-gray-500 rounded p-3 bg-white';

export default function CatalogPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const style = params.get('style') || '';
  const descending = params.get('sort') === 'za';
  const filtered = TEMPLATES.filter(item =>
    (!category || item.category === category) && (!style || item.style === style)
  ).sort((a, b) => (descending ? -1 : 1) * a.name.localeCompare(b.name));

  function setOption(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  return (
    <section className="py-12 md:py-20" style={{ background: '#f8f6ee', color: '#173d36' }}>
      <Seo title={`แบบเว็บไซต์${category ? 'สำหรับ' + designLabel(category) : 'ตามประเภทธุรกิจ'} | Tempa123`} description={category ? `ดูแบบเว็บไซต์สำหรับ${designLabel(category)} พร้อมเลือกสไตล์และเปรียบเทียบชุดสีก่อนสอบถามงานปรับแต่ง` : 'เลือกดูแบบเว็บไซต์ตามประเภทธุรกิจและสไตล์ พร้อมดูชุดสีและแนวทางจัดหน้าก่อนสอบถามบริการปรับแต่ง'} />
      <div className="container mx-auto px-6 lg:px-[8vw]">
        <h1 className="text-4xl md:text-5xl font-bold">เลือกแบบเว็บไซต์ให้เหมาะกับธุรกิจ</h1>
        <p className="my-4 max-w-2xl">เลือกประเภทธุรกิจหรือสไตล์ที่ชอบ แล้วเปิดดูแนวทางจัดหน้าและชุดสีของแต่ละแบบ หากสนใจแบบไหน ส่งให้ทีมช่วยประเมินงานปรับแต่งได้เลย</p>
        <div className="grid md:grid-cols-3 gap-4 my-8">
          <label>ประเภทธุรกิจ<select className={selectClass} value={category || ''} onChange={event => navigate({ pathname: event.target.value ? getCatalogCategoryPath(event.target.value) : SITE_MAP.CATALOG, search: params.toString() })}>
            <option value="">ทุกประเภทธุรกิจ</option>
            {category && !categories.some(c => c === category) && <option value={category}>{designLabel(category)}</option>}
            {categories.map(c => <option key={c} value={c}>{designLabel(c)}</option>)}
          </select></label>
          <label>สไตล์<select className={selectClass} value={style} onChange={event => setOption('style', event.target.value)}>
            <option value="">ทุกสไตล์</option>
            {style && !styles.some(s => s === style) && <option value={style}>{style}</option>}
            {styles.map(s => <option key={s} value={s}>{designLabel(s)}</option>)}
          </select></label>
          <label>เรียงตามชื่อ<select className={selectClass} value={descending ? 'za' : ''} onChange={event => setOption('sort', event.target.value)}>
            <option value="">A ถึง Z</option><option value="za">Z ถึง A</option>
          </select></label>
        </div>
        <p role="status" className="mb-4">พบ {filtered.length} แบบ{category ? ` ในหมวด ${designLabel(category)}` : ''}</p>
        {filtered.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => <TemplateCard key={item.id} template={item} />)}
        </div> : <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">ยังไม่มีแบบเว็บไซต์ที่ตรงกับตัวเลือกนี้</h2>
          <p className="my-3">ลองดูแบบเว็บไซต์ทั้งหมด หรือบอกทีมว่าคุณอยากได้เว็บไซต์แบบไหน</p>
          <Link className="underline mr-6" to={SITE_MAP.CATALOG}>ล้างตัวกรอง</Link>
          <Link className="underline" to={SITE_MAP.CONTACT}>สอบถามทีมงาน</Link>
        </div>}
      </div>
    </section>
  );
}
