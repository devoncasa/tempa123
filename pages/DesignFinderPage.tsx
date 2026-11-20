import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { TemplateCategory } from '../types';
import { SITE_MAP, getTemplateDetailPath } from '../src/siteMap';
import { designLabel } from '../components/TemplateCard';
import Seo from '../components/Seo';
import './DesignFinderPage.css';

const categories = Object.values(TemplateCategory).filter(category => TEMPLATES.some(template => template.category === category));
const goals = [
  { id: 'enquire', label: 'สอบถามหรือขอราคา', menus: /contact|enquir|quote|consult/i },
  { id: 'book', label: 'จองเวลาหรือบริการ', menus: /book|schedule|reservation/i },
  { id: 'shop', label: 'เลือกดูสินค้า', menus: /shop|product|collection|store/i },
  { id: 'explore', label: 'ชมผลงานหรือตัวอย่างงาน', menus: /portfolio|gallery|work|project/i },
];
const support = [
  { id: 'self', label: 'อยากนำแบบไปทำต่อเอง' },
  { id: 'setup', label: 'ให้ทีมช่วยตั้งค่าและปรับแต่ง' },
  { id: 'advice', label: 'อยากคุยกับทีมก่อนตัดสินใจ' },
];
const title = 'ช่วยเลือกแบบเว็บไซต์ให้เหมาะกับธุรกิจ';
const description = 'เลือกประเภทธุรกิจ เป้าหมาย และบริการที่ต้องการ เพื่อดูแบบเว็บไซต์ที่เกี่ยวข้องและส่งบรีฟให้ทีม Tempa123';

export function readFinderAnswers(params: URLSearchParams) {
  const business = params.get('business') || '';
  const category = categories.find(item => item === business);
  const goal = goals.find(item => item.id === params.get('goal'));
  const help = support.find(item => item.id === params.get('help'));
  const businessLabel = category ? designLabel(category) : 'ธุรกิจประเภทอื่น';
  const ready = Boolean((category || business === 'other') && goal && help);
  const query = new URLSearchParams();
  if (category || business === 'other') query.set('business', business);
  if (goal) query.set('goal', goal.id);
  if (help) query.set('help', help.id);
  const brief = ready ? [`ประเภทธุรกิจ: ${businessLabel}`, `อยากให้ลูกค้า${goal!.label}`, `บริการที่สนใจ: ${help!.label}`].join('\n') : '';
  return {business, category, goal, help, businessLabel, ready, query, brief};
}

export default function DesignFinderPage() {
  const [params, setParams] = useSearchParams();
  const {business, category, goal, help, businessLabel, ready, query: answers, brief} = readFinderAnswers(params);

  function choose(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  }
  function contactPath(template?: string) {
    const query = new URLSearchParams();
    query.set('brief', brief);
    if (template) query.set('template', template);
    return SITE_MAP.CONTACT + '?' + query.toString();
  }

  const matches = ready && category ? TEMPLATES.filter(item => item.category === category)
    .map(template => ({ template, menu: template.necessaryMenu.find(label => goal!.menus.test(label)) }))
    .sort((a, b) => Number(Boolean(b.menu)) - Number(Boolean(a.menu)) || a.template.name.localeCompare(b.template.name, 'en'))
    .slice(0, 3) : [];

  return <section className="design-finder" lang="th">
    <Seo title={title + ' | Tempa123'} description={description}/>
    <div className="finder-shell">
      <header className="finder-intro"><h1>{title}</h1><p>ลองเลือกสิ่งที่ลูกค้าของคุณควรทำได้บนเว็บ แล้วเปรียบเทียบแนวทางออกแบบที่เข้ากับงาน</p></header>
      <div className="finder-grid">
        <div className="finder-choices">
          <label htmlFor="finder-business">ธุรกิจของคุณอยู่ในกลุ่มไหน</label>
          <select id="finder-business" value={category || (business === 'other' ? 'other' : '')} onChange={event => choose('business', event.target.value)}>
            <option value="">เลือกประเภทธุรกิจ</option>
            {[...categories].sort((a,b) => designLabel(a).localeCompare(designLabel(b),'th')).map(item => <option key={item} value={item}>{designLabel(item)}</option>)}
            <option value="other">ธุรกิจประเภทอื่น</option>
          </select>
          <fieldset><legend>อยากให้ลูกค้าทำอะไรเป็นหลัก</legend>
            {goals.map(item => <label className="finder-choice" key={item.id}><input type="radio" name="finder-goal" checked={goal?.id === item.id} onChange={() => choose('goal', item.id)}/>{item.label}</label>)}
          </fieldset>
          <fieldset><legend>อยากให้ทีมช่วยส่วนไหน</legend>
            {support.map(item => <label className="finder-choice" key={item.id}><input type="radio" name="finder-help" checked={help?.id === item.id} onChange={() => choose('help', item.id)}/>{item.label}</label>)}
          </fieldset>
          {(business || goal || help) && <button type="button" className="finder-reset" onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>เริ่มเลือกใหม่</button>}
        </div>
        <div className="finder-results" aria-labelledby="finder-heading">
          <h2 id="finder-heading">แบบที่น่าลองดู</h2>
          <p role="status">{!ready ? 'เลือกคำตอบให้ครบทั้งสามข้อ แล้วแบบที่เกี่ยวข้องจะแสดงตรงนี้' : matches.length ? 'คัดมา ' + matches.length + ' แบบในหมวด' + businessLabel + ' โดยแสดงแบบที่มีชื่อเมนูเกี่ยวข้องกับเป้าหมายของคุณก่อน' : 'ยังไม่มีหมวดที่ตรงกับธุรกิจของคุณโดยเฉพาะ คุณส่งรายละเอียดให้ทีมช่วยดูได้'}</p>
          {matches.length > 0 && <ul>{matches.map(({ template, menu }) => <li key={template.id}>
            <h3><Link to={getTemplateDetailPath(template.id) + '?' + answers.toString()}>{template.name}</Link></h3>
            <p>{template.style ? designLabel(template.style) + ' · ' : ''}{designLabel(template.category)}</p>
            {menu && <p>เมนูที่ระบุในแนวทางออกแบบ <span lang="en">{menu}</span></p>}
            <div className="finder-links"><Link to={getTemplateDetailPath(template.id) + '?' + answers.toString()}>ดูรายละเอียดแบบ</Link><Link to={contactPath(template.id)}>ส่งบรีฟพร้อมแบบนี้</Link></div>
          </li>)}</ul>}
          {ready && <div className="finder-next"><p>{help?.label} — ทีมจะใช้คำตอบเหล่านี้ประกอบการคุยเรื่องขอบเขตงานและฟังก์ชันที่ต้องตั้งค่าเพิ่ม</p><Link to={contactPath()}>ส่งบรีฟให้ทีมช่วยดู</Link></div>}
          <Link className="finder-catalog" to={SITE_MAP.CATALOG}>ดูแบบเว็บไซต์ทั้งหมด</Link>
        </div>
      </div>
    </div>
  </section>;
}
