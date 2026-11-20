import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';

type Receipt = { reference: string; preview: boolean };
type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };
const heading = 'เล่าโปรเจกต์เว็บไซต์ของคุณ';
const description = 'ส่งรายละเอียดธุรกิจ แบบเว็บไซต์ที่สนใจ และสิ่งที่ต้องการปรับแต่งให้ทีม Tempa123 เพื่อประเมินขอบเขตงาน';
const schema = { '@context': 'https://schema.org', '@type': 'ContactPage', name: heading, inLanguage: 'th' };
const contactCss = `
.tempa-contact{background:#f7f4ed;color:#173f39;padding:clamp(36px,6vw,92px) max(5vw,20px);line-height:1.65}
.tempa-contact .contact-layout{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(28px,6vw,88px);max-width:1100px;margin:auto}
.tempa-contact h1{font-size:clamp(2.1rem,4.6vw,4rem);line-height:1.25;letter-spacing:-.025em;margin:0 0 18px;color:#173f39}
.tempa-contact h2{font-size:1.25rem;font-weight:700;margin:0 0 15px}.tempa-contact p{margin:0 0 16px}
.tempa-contact .brief-panel{padding:clamp(20px,3vw,42px);background:#fffdf8;border:1px solid #c4b494;min-width:0}
.tempa-contact .summary{padding:18px 0;margin:22px 0;border-block:1px solid #b9b7a8}
.tempa-contact dt{font-weight:700}.tempa-contact dd{margin:0 0 8px;overflow-wrap:anywhere}
.tempa-contact label{font-weight:650;display:block;margin:0 0 15px}
.tempa-contact input:not([type=checkbox]),.tempa-contact textarea{display:block;width:100%;padding:10px 12px;margin-top:6px;border:1px solid #657a73;background:#fff;color:#193f39;border-radius:3px;min-height:44px;font:inherit}
.tempa-contact .checkbox{font-weight:400;display:flex;align-items:flex-start;gap:10px}.tempa-contact input[type=checkbox]{accent-color:#153f39;margin-top:6px;width:18px;height:18px;flex:none}
.tempa-contact button{background:#173f39;color:white;padding:10px 22px;border-radius:3px;min-height:44px;border:1px solid #173f39;font-weight:650;cursor:pointer}
.tempa-contact button:disabled{opacity:.65}.tempa-contact :focus-visible{outline:3px solid #a24d25;outline-offset:3px}
.tempa-contact a{color:#15594d;text-decoration:underline}.tempa-contact .form-error{color:#8e2823}
.tempa-contact .trap{display:none}@media(max-width:760px){.tempa-contact .contact-layout{grid-template-columns:1fr;gap:24px}.tempa-contact .brief-panel{padding:20px}}
`;

function storeValue(key: string, value?: string) {
  try {
    if (value !== undefined) sessionStorage.setItem(key, value);
    return sessionStorage.getItem(key);
  } catch { return null; }
}

const ContactPage: React.FC = () => {
  const [params] = useSearchParams();
  const offline = typeof window !== 'undefined' && (window.location.protocol === 'file:' || document.documentElement.hasAttribute('data-tempa-offline'));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const sending = useRef(false);
  const pending = useRef<{ hash: string; key: string } | null>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const template = params.get('template')?.slice(0, 160) || '';
  const selectedPackage = params.get('package')?.slice(0, 160) || '';
  const estimate = params.get('estimate')?.slice(0, 240) || '';
  const addons = params.get('addons')?.slice(0, 400) || '';
  const selections = [
    ['แบบเว็บไซต์', template], ['แพ็กเกจ', selectedPackage], ['บริการเสริม', addons], ['งบประมาณเบื้องต้น', estimate],
  ].filter(([, value]) => value);
  useEffect(() => { if (receipt) confirmation.current?.focus(); }, [receipt]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || offline) return;
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') ?? '').trim(), email: String(form.get('email') ?? '').trim(),
      brief: String(form.get('brief') ?? '').trim(), consent: form.get('consent') === 'yes',
      website: String(form.get('website') ?? ''), template, package: selectedPackage, estimate, addons,
    };
    if (!payload.name || payload.brief.length < 10) {
      setError('กรุณาระบุชื่อและเล่าเกี่ยวกับโปรเจกต์อย่างน้อย 10 ตัวอักษร'); return;
    }
    sending.current = true;
    setError(''); setBusy(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const body = JSON.stringify(payload);
      const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
      const hash = Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('');
      const storageKey = 'tempa-enquiry-attempt-' + hash;
      const key = pending.current?.hash === hash ? pending.current.key : storeValue(storageKey) || crypto.randomUUID();
      pending.current = { hash, key }; storeValue(storageKey, key);
      const response = await fetch('/api/enquiries', {
        method: 'POST', body, signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
      });
      if (!response.ok) {
        setError(response.status === 429 ? 'ส่งคำขอถี่เกินไป กรุณารอสักครู่แล้วลองอีกครั้ง'
          : response.status === 422 ? 'กรุณาตรวจสอบชื่อ อีเมล และรายละเอียดที่กรอก แล้วลองอีกครั้ง'
          : 'ระบบยังยืนยันการรับข้อมูลไม่ได้ กรุณาลองส่งอีกครั้งด้วยข้อมูลเดิม');
        return;
      }
      const result = await response.json();
      if (!/^TMP-[0-9A-F]{16}$/.test(result.reference) || typeof result.preview !== 'boolean') throw new Error('receipt');
      setReceipt(result);
      if (!result.preview && !storeValue('tempa-lead-' + key)) {
        try {
          const track = (window as AnalyticsWindow).gtag;
          if (track) { track('event', 'generate_lead', { form_name: 'project_enquiry' }); storeValue('tempa-lead-' + key, '1'); }
        } catch { /* A blocked analytics provider cannot cancel an accepted enquiry. */ }
      }
    } catch { setError('ยังไม่ได้รับเลขอ้างอิง กรุณาตรวจสอบการเชื่อมต่อแล้วลองส่งอีกครั้ง'); }
    finally { window.clearTimeout(timeout); sending.current = false; setBusy(false); }
  }

  return <>
    <Seo title="สอบถามบริการทำเว็บไซต์ | Tempa123" description={description} schema={schema} />
    <style>{contactCss}</style>
    <section className="tempa-contact" lang="th"><div className="contact-layout">
      <div><h1>{heading}</h1>
        <p>บอกเราว่าคุณทำธุรกิจอะไร อยากให้ลูกค้าทำอะไรบนเว็บไซต์ และมีแบบไหนที่ชอบ ทีมงานจะใช้ข้อมูลนี้คุยกับคุณเรื่องขอบเขตงานทางอีเมล</p>
        {selections.length > 0 && <div className="summary"><h2>รายการที่คุณเลือก</h2><dl>{selections.map(([label, value]) => <React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>)}</dl><p>ทีมงานจะตรวจสอบรายการและยืนยันราคาก่อนเริ่มงาน</p></div>}
        <p>ต้องการคุยทางโทรศัพท์ <a href="tel:+66818519922">+66 81 851 9922</a></p>
      </div>
      <div className="brief-panel">{receipt ? <div role="status"><h2 ref={confirmation} tabIndex={-1}>{receipt.preview ? 'รับข้อมูลทดสอบแล้ว' : 'รับรายละเอียดโปรเจกต์แล้ว'}</h2><p>เลขอ้างอิง <strong>{receipt.reference}</strong></p><p>{receipt.preview ? 'รายการนี้บันทึกในพื้นที่ทดสอบสำหรับตรวจสอบแบบฟอร์ม' : 'โปรดเก็บเลขอ้างอิงนี้ไว้สำหรับติดตามเรื่องกับทีมงาน'}</p></div> :
      <form onSubmit={submit} aria-busy={busy}><h2>รายละเอียดโปรเจกต์</h2>
        <label>ชื่อผู้ติดต่อ<input name="name" autoComplete="name" required maxLength={100}/></label>
        <label>อีเมลสำหรับติดต่อกลับ<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
        <label>สิ่งที่อยากให้เราช่วย<textarea name="brief" defaultValue={params.get('brief')?.slice(0, 3000) || ''} rows={5} minLength={10} maxLength={3000} required/></label>
        <div className="trap" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1}/></label></div>
        <label className="checkbox"><input type="checkbox" name="consent" value="yes" required/>ยินยอมให้ทีมงานใช้ข้อมูลนี้เพื่อติดต่อกลับเกี่ยวกับโปรเจกต์</label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {offline && <p role="note">ตัวอย่างออฟไลน์นี้ใช้ทดลองเลือกแบบและเตรียมรายละเอียดได้ การส่งคำขอต้องเปิดผ่านเว็บไซต์</p>}
        <button type="submit" disabled={busy || offline}>{busy ? 'กำลังส่งรายละเอียด…' : 'ส่งรายละเอียดโปรเจกต์'}</button>
      </form>}</div>
    </div></section>
  </>;
};
export default ContactPage;
