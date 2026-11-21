import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TEMPLATES } from '../../constants';
import Seo from '../../components/Seo';
import { SITE_MAP, getTemplateDetailPath } from '../siteMap';

export default function CheckoutPage() {
  const { id } = useParams();
  const template = TEMPLATES.find(item => item.id === id);
  const title = template ? 'ขอใบเสนอราคาสำหรับ ' + template.name : 'เลือกแบบเว็บไซต์';
  return (
    <section className="py-16 md:py-24 px-6">
      <Seo title={title + ' | Tempa123'} description={template ? `ขอให้ทีมประเมินแบบ ${template.name} และยืนยันรายการไฟล์ สิทธิ์การใช้งาน รวมถึงขอบเขตการปรับแต่งก่อนชำระเงิน` : 'เลือกแบบเว็บไซต์ที่สนใจ แล้วขอให้ทีมยืนยันขอบเขตงานและราคา'} />
      <div className="max-w-2xl mx-auto p-8 rounded-lg" style={{ color: '#173d36', background: '#f8f6ee', border: '1px solid #bfc9bc' }}>
        <h1 className="text-3xl font-bold">{title}</h1>
        {template ? <>
          <p className="my-5">ส่งแบบนี้ให้ทีมช่วยประเมินราคา และขอรายละเอียดเรื่องไฟล์ สิทธิ์ในการใช้งาน และขอบเขตงานก่อนชำระเงิน</p>
          <Link className="inline-block rounded px-6 py-3 font-semibold" style={{ background: '#173d36', color: 'white' }} to={SITE_MAP.CONTACT + '?' + new URLSearchParams({ template: template.id })}>สอบถามราคา</Link>
          <p className="mt-4"><Link className="underline" to={getTemplateDetailPath(template.id)}>กลับไปดูรายละเอียดแบบ</Link></p>
        </> : <>
          <p className="my-5">ไม่พบแบบเว็บไซต์จากลิงก์นี้ คุณเลือกแบบจากแคตตาล็อกเพื่อดูรายละเอียดและสอบถามราคาได้</p>
          <Link className="underline" to={SITE_MAP.CATALOG}>ดูแบบเว็บไซต์ทั้งหมด</Link>
        </>}
      </div>
    </section>
  );
}
