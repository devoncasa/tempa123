import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import type { Template } from '../types';
import NotFoundPage from './NotFoundPage';
import TemplateCard, { TemplatePalette, designLabel } from '../components/TemplateCard';
import Seo from '../components/Seo';
import { readFinderAnswers } from './DesignFinderPage';
import { SITE_MAP, getCatalogCategoryPath } from '../src/siteMap';

function DesignBrief({template}: {template: Template}) {
  const [params, setParams] = useSearchParams();
  const answers = readFinderAnswers(params);
  const chosen = template.colorThemes.find(item => item.name === params.get('palette'));
  const theme = chosen || template.colorThemes[0];
  function choosePalette(name: string) {
    const next = new URLSearchParams(answers.query);
    next.set('palette', name);
    setParams(next, { replace: true, preventScrollReset: true });
  }
  const related = TEMPLATES.filter(t => t.category === template.category && t.id !== template.id).slice(0, 3);
  const enquiryParams = new URLSearchParams({ template: template.id });
  const brief = [answers.brief, chosen && 'ชุดสีที่สนใจ: ' + chosen.name].filter(Boolean).join('\n');
  if (brief) enquiryParams.set('brief', brief);
  const enquiry = SITE_MAP.CONTACT + '?' + enquiryParams.toString();
  return (
    <section className="py-12 md:py-20" style={{ background: '#f8f6ee', color: '#173d36' }}>
      <Seo title={template.name + ' — แนวทางออกแบบเว็บไซต์ | Tempa123'} description={`ดูแนวทางออกแบบ ${template.name} สำหรับ${designLabel(template.category)} พร้อมชุดสี หน้าที่แนะนำ และรายละเอียดที่ควรสอบถามก่อนขอราคา`} />
      <div className="container mx-auto px-6 lg:px-[8vw]">
        <Link to={getCatalogCategoryPath(template.category)} className="underline">กลับไปดูหมวด{designLabel(template.category)}</Link>
        <div className="grid lg:grid-cols-2 gap-10 my-8 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{template.name}</h1>
            <p className="mt-4 text-xl" lang="en">{template.tagline}</p>
            <p className="my-6">ก่อนตัดสินใจ คุณสามารถสอบถามทีมเรื่องไฟล์ที่จะได้รับ สิทธิ์ในการใช้งาน และส่วนที่อยากปรับแต่ง เพื่อให้ทีมประเมินราคาได้ตรงกับงาน</p>
            <Link to={enquiry} style={{ backgroundColor: '#173d36', color: 'white' }} className="inline-block rounded px-6 py-3 font-semibold">สอบถามเกี่ยวกับแบบนี้</Link>
          </div>
          {theme && <fieldset className="bg-white rounded-lg p-6" style={{ border: '1px solid #bfc9bc' }}>
            <legend className="font-semibold px-2">ลองเลือกชุดสี</legend>
            <TemplatePalette colors={theme.palette} />
            <p className="my-3" aria-live="polite">{theme.name} · {theme.palette.join(' / ')}</p>
            <div className="flex flex-wrap gap-4">
              {template.colorThemes.map((option) => <label className="p-2" key={option.name}>
                <input type="radio" name="palette" checked={option === chosen} onChange={() => choosePalette(option.name)} /> {option.name}
              </label>)}
            </div>
          </fieldset>}
        </div>
        <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
          <div><h2 className="font-bold text-2xl mb-3">หน้าที่แนะนำ</h2><ul className="list-disc pl-5" lang="en">{template.necessaryMenu.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h2 className="font-bold text-2xl mb-3">ฟังก์ชันที่คุยกับทีมได้</h2><ul className="list-disc pl-5" lang="en">{template.features.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h2 className="font-bold text-2xl mb-3">แนวทางจัดหน้า</h2><ul className="list-disc pl-5" lang="en">{template.layoutVariations.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h2 className="font-bold text-2xl mb-3">แบบอักษรที่แนะนำ</h2><ul className="list-disc pl-5" lang="en">{template.fontOptions.map(item => <li key={item.name}>{item.fonts.join(' + ')}</li>)}</ul></div>
        </div>
        {related.length > 0 && <div className="pt-10"><h2 className="font-bold text-2xl mb-4">แบบอื่นในหมวดเดียวกัน</h2><div className="grid md:grid-cols-3 gap-4">{related.map(item => <TemplateCard key={item.id} template={item} />)}</div></div>}
      </div>
    </section>
  );
}

export default function TemplateDetailPage() {
  const { id } = useParams();
  const template = TEMPLATES.find(item => item.id === id);
  return template ? <DesignBrief key={template.id} template={template} /> : <NotFoundPage />;
}
