import React from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../types';
import { getTemplateDetailPath } from '../src/siteMap';

interface TemplateCardProps {
  template: Template;
}

const labels: Record<string, string> = {
  "Jewelry & Beads": "อัญมณีและลูกปัด",
  "Food & Café": "ร้านอาหารและคาเฟ่",
  "Wellness & Spa": "สุขภาพและสปา",
  "Portfolio & Personal Branding": "พอร์ตโฟลิโอและแบรนด์ส่วนบุคคล",
  "Coaches & Mentors": "โค้ชและที่ปรึกษา",
  "Artisan & Handmade": "งานฝีมือและสินค้าทำมือ",
  "E-commerce & Retail": "ร้านค้าออนไลน์และค้าปลีก",
  "Real Estate": "อสังหาริมทรัพย์",
  "Events & Weddings": "งานอีเวนต์และงานแต่งงาน",
  "Technology & Startups": "ธุรกิจเทคโนโลยีและสตาร์ตอัป",
  "Education & Online Courses": "การศึกษาและคอร์สออนไลน์",
  "Non-Profit & Charity": "องค์กรไม่แสวงหากำไร",
  "Health & Fitness": "สุขภาพและฟิตเนส",
  "Travel & Tourism": "การเดินทางและท่องเที่ยว",
  "Creative Agencies": "ครีเอทีฟเอเจนซี",
  "Photography": "งานถ่ายภาพ",
  "Home Services": "บริการดูแลบ้าน",
  "Automotive & Car Services": "ธุรกิจยานยนต์",
  "Fashion & Apparel": "แฟชั่นและเสื้อผ้า",
  "Beauty & Cosmetics": "ความงามและเครื่องสำอาง",
  "Legal Services & Law Firms": "งานกฎหมายและสำนักงานทนายความ",
  "Financial Services & Consulting": "การเงินและที่ปรึกษา",
  "Construction & Architecture": "การก่อสร้างและสถาปัตยกรรม",
  "Entertainment & Nightlife": "ความบันเทิงและสถานบันเทิง",
  "Music & Bands": "ดนตรีและวงดนตรี",
  "Pet Care & Veterinary": "การดูแลสัตว์เลี้ยงและสัตวแพทย์",
  "Marketing & Advertising": "การตลาดและโฆษณา",
  "Blog & Magazine": "บล็อกและนิตยสาร",
  "Medical & Healthcare": "การแพทย์และสถานพยาบาล",
  "Childcare & Education": "การดูแลเด็กและการศึกษา",
  "Minimalist": "มินิมอล",
  "Modern": "โมเดิร์น",
  "Corporate": "องค์กร",
  "Rustic": "รัสติก",
  "Elegant": "เรียบหรู",
  "Playful": "สนุกสดใส",
  "Chic": "เก๋ร่วมสมัย",
  "Vibrant": "สีสันจัดจ้าน"
};

export const designLabel = (name: string) => labels[name] || name;

export const TemplatePalette = ({ colors }: { colors: string[] }) => (
  <span aria-hidden="true" style={{ display: 'flex', height: '1rem', overflow: 'hidden', border: '1px solid #c4c7b9' }}>
    {colors.map((color, i) => <span key={i} style={{ backgroundColor: color, flex: 1 }} />)}
  </span>
);

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const theme = template.colorThemes[0];
  return (
    <article className="min-w-0 [overflow-wrap:anywhere] bg-white p-6 rounded-lg flex flex-col gap-3" style={{ border: '1px solid #bfc9bc', color: '#173d36' }}>
      {theme && <TemplatePalette colors={theme.palette} />}
      <p className="text-sm">{designLabel(template.category)} · {template.style && designLabel(template.style) || 'แนวทางออกแบบ'}</p>
      <h3 className="text-2xl font-bold leading-tight">
        <Link to={getTemplateDetailPath(template.id)} className="underline underline-offset-4">{template.name}</Link>
      </h3>
      <p className="text-sm" lang="en">{template.tagline}</p>
      {theme && <p className="text-sm mt-auto">ชุดสี · {theme.name}</p>}
    </article>
  );
};

export default TemplateCard;
