import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { TEMPLATES } from '../constants';
import { SITE_MAP } from '../src/siteMap';
import { QuoteWorkshop, scopeUrl, serviceScopes } from './CustomizationServicesPage';

const scopes = ['ใช้แบบเว็บไซต์', ...serviceScopes.map(scope => scope.name)];
const extras = ['เพิ่มหน้าแนะนำบริการ', 'จัดหน้าสินค้า', 'แบบฟอร์มติดต่อ', 'เพิ่มภาษา', 'เชื่อมต่อระบบเดิม'];

export default function PricingCalculatorPage() {
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState('');
  const selected = TEMPLATES.find(template => template.id === query.get('template'));
  const scope = scopes.find(name => name === query.get('package')) || '';
  const extrasParam = (query.get('addons') || '').split(', ');
  const chosenExtras = extras.filter(name => extrasParam.includes(name));
  const match = search.trim().toLowerCase();
  const matchingTemplates = TEMPLATES.filter(template =>
    (template.name + ' ' + template.category).toLowerCase().includes(match)
  );
  // Keep the chosen option visible while the visitor searches for another design.
  const options = selected && !matchingTemplates.includes(selected) ? [selected, ...matchingTemplates] : matchingTemplates;
  function update(key: string, value: string) {
    const next = new URLSearchParams(query);
    if (value) next.set(key, value);
    else next.delete(key);
    setQuery(next, { replace: true, preventScrollReset: true });
  }

  return <QuoteWorkshop>
    <Seo title="เลือกขอบเขตงานเพื่อประเมินค่าทำเว็บไซต์ | Tempa123" description="เลือกแบบเว็บไซต์ งานที่ต้องการให้ช่วย และบริการเสริม แล้วส่งรายละเอียดให้ทีมประเมินราคาตามโครงการ" />
    <h1>เลือกงานที่ต้องการ แล้วให้ทีมประเมินราคา</h1>
    <p className="quote-lead">มีแบบในใจแล้วหรือเพิ่งเริ่มหาข้อมูลก็ได้ เลือกเท่าที่ทราบ แล้วนำรายการนี้ไปคุยกับทีมเรื่องงบและระยะเวลาทำงาน</p>
    <div className="quote-columns"><div className="quote-form">
      <fieldset><legend>แบบเว็บไซต์ที่สนใจ</legend>
        <label htmlFor="quote-filter">ค้นหาด้วยชื่อแบบหรือหมวดภาษาอังกฤษ</label>
        <input type="search" id="quote-filter" placeholder="เช่น Aqua Pura หรือ Wellness" value={search} onChange={event => setSearch(event.target.value)} />
        {match && <p role="status">{matchingTemplates.length ? 'พบ ' + matchingTemplates.length + ' แบบ' : 'ไม่พบแบบที่ตรงกับคำค้น ลองค้นใหม่ หรือให้ทีมช่วยแนะนำได้'}</p>}
        <label htmlFor="quote-template">เลือกแบบ</label>
        <select id="quote-template" value={selected?.id || ''} onChange={event => update('template', event.target.value)}>
          <option value="">ให้ทีมช่วยแนะนำ</option>
          {options.map(template => <option key={template.id} value={template.id}>{template.name}</option>)}
        </select>
      </fieldset>
      <fieldset><legend>งานหลักที่อยากให้ช่วย</legend>
        <label htmlFor="quote-scope">เลือกบริการ</label>
        <select id="quote-scope" value={scope} onChange={event => update('package', event.target.value)}>
          <option value="">ขอคำแนะนำก่อนเลือก</option>
          {scopes.map(name => <option key={name}>{name}</option>)}
        </select>
      </fieldset>
      <fieldset><legend>สิ่งที่อยากเพิ่มในเว็บไซต์</legend>
        {extras.map(name => <label className="quote-choice" key={name}>
          <input type="checkbox" checked={chosenExtras.includes(name)} onChange={event => {
            const nextExtras = event.target.checked ? [...chosenExtras, name] : chosenExtras.filter(extra => extra !== name);
            update('addons', nextExtras.join(', '));
          }} />{name}
        </label>)}
      </fieldset>
    </div><aside className="quote-summary"><h2>สรุปงานที่อยากสอบถาม</h2>
      <dl><dt>แบบเว็บไซต์</dt><dd>{selected?.name || 'ให้ทีมช่วยแนะนำ'}</dd>
        <dt>งานหลัก</dt><dd>{scope || 'ขอคำแนะนำก่อนเลือก'}</dd>
        <dt>รายการเพิ่มเติม</dt><dd>{chosenExtras.join(' · ') || 'ยังไม่ได้เลือก'}</dd>
      </dl>
      <p>ทีมจะยืนยันค่าแบบ ค่าบริการ และค่าใช้จ่ายที่อาจต้องต่ออายุในใบเสนอราคา คุณยังแก้ไขรายละเอียดได้ก่อนส่งคำถาม</p>
      <Link className="quote-cta" to={scopeUrl(SITE_MAP.CONTACT, scope, selected?.id, chosenExtras)}>นำรายการนี้ไปขอราคา</Link>
    </aside></div>
  </QuoteWorkshop>;
}
