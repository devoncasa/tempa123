import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { QuoteWorkshop, scopeUrl } from './CustomizationServicesPage';

const menu = [
  { name: 'ข้าวมันไก่ต้ม', price: 50 },
  { name: 'ข้าวมันไก่ทอด', price: 50 },
  { name: 'ข้าวมันไก่ผสม', price: 60 },
];
const styles = `
.line-kit {margin-block:2rem;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:1rem}
.line-kit>section {min-width:0;padding:clamp(1rem,3vw,2rem);border:1px solid #aebca9;background:#fffdf6}
.line-kit>section:last-child {background:#e6ecdd}
.line-kit ul {list-style:none;padding:0;margin:1rem 0}
.line-kit li {display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.7rem;border-top:1px solid #b6c5ad;padding:.8rem 0}
.line-kit button {min-height:44px;border:1px solid #426659;color:#163c34;border-radius:3px;padding:.45rem .8rem;background:#fffdf7;font:inherit;cursor:pointer}
.line-kit button:disabled {opacity:.58;cursor:default}
.line-kit .line-submit {width:100%;background:#164b42;color:white}
.line-sum {font-size:1.12rem;font-weight:700;padding-block:.7rem}
.line-kit .line-status {color:#245b46;font-weight:600}
@media(max-width:760px){.line-kit{grid-template-columns:minmax(0,1fr)}}
`;

function OrderExample() {
  const [quantities, setQuantities] = useState(() => menu.map(() => 0));
  const [finished, setFinished] = useState(false);
  const sign = useRef<HTMLHeadingElement>(null);
  const firstAdd = useRef<HTMLButtonElement>(null);
  const count = quantities.reduce((total, quantity) => total + quantity, 0);
  const total = menu.reduce((amount, item, i) => amount + item.price * quantities[i], 0);

  useEffect(() => {
    if (finished) sign.current?.focus();
  }, [finished]);

  function change(index: number, difference: number) {
    setQuantities(current => current.map((quantity, i) =>
      index === i ? Math.max(0, quantity + difference) : quantity
    ));
  }

  function reset() {
    setFinished(false);
    setQuantities(menu.map(() => 0));
    requestAnimationFrame(() => firstAdd.current?.focus());
  }

  return <div className="line-kit">
    <section aria-labelledby="demo-menu">
      <h2 id="demo-menu">ลองเลือกเมนูข้าวมันไก่</h2>
      <p>เลือกเมนูแล้วลองเพิ่มหรือลดจำนวน เพื่อดูยอดรวมก่อนยืนยันออเดอร์ตัวอย่าง</p>
      <ul>{menu.map((item, i) =>
        <li key={item.name}><span><strong>{item.name}</strong><br />{item.price} บาท</span>
          <button type="button" ref={i === 0 ? firstAdd : undefined} aria-label={'เพิ่ม' + item.name} disabled={finished} onClick={() => change(i, 1)}>เพิ่มลงตะกร้า</button>
        </li>)}</ul>
    </section>
    <section aria-labelledby="demo-cart">
      <h2 id="demo-cart" ref={sign} tabIndex={-1}>{finished ? 'ยืนยันออเดอร์ตัวอย่างแล้ว' : 'ตะกร้าของคุณ'}</h2>
      {count === 0 && <p>ตะกร้ายังว่างอยู่ ลองเลือกเมนูที่อยากสั่ง</p>}
      <ul>{menu.map((item, i) => quantities[i] > 0 && <li key={item.name}><span>{item.name} × {quantities[i]}<br /><strong>{item.price * quantities[i]} บาท</strong></span>
        {!finished && <button type="button" onClick={() => change(i, -1)} aria-label={'ลด' + item.name + 'หนึ่งจาน'}>ลด 1 จาน</button>}
      </li>)}</ul>
      <p className="line-sum" aria-live="polite">รวม {count} จาน · {total} บาท</p>
      {finished ? <><p className="line-status">จบการทดลองแล้ว ร้านค้าไม่ได้รับออเดอร์นี้</p>
        <button type="button" onClick={reset}>เริ่มทดลองใหม่</button></> :
        <button type="button" className="line-submit" disabled={count === 0} onClick={() => setFinished(true)}>ยืนยันออเดอร์ตัวอย่าง</button>}
    </section>
  </div>;
}

export default function LineOrderingKitPage() {
  return <QuoteWorkshop><style>{styles}</style>
    <Seo title="ลองหน้ารับออเดอร์สำหรับร้านที่ขายผ่าน LINE | Tempa123" description="ทดลองเลือกเมนู เพิ่มจำนวน และตรวจยอดรวมในตะกร้าตัวอย่าง ก่อนส่งรายละเอียดให้ทีมประเมินหน้ารับออเดอร์สำหรับร้านของคุณ" />
    <h1>หน้ารับออเดอร์สำหรับร้านที่ขายผ่าน LINE</h1>
    <p className="quote-lead">ให้ลูกค้าเห็นเมนู ราคา และจำนวนที่เลือกได้ในหน้าเดียว ลองใช้ตัวอย่างด้านล่างได้โดยไม่ต้องโอนเงินหรือส่งสลิป</p>
    <OrderExample />
    <aside className="quote-note"><h2>อยากใช้กับเมนูของร้านคุณ?</h2><p>ส่งรายชื่อเมนู ราคา ตัวเลือกพิเศษ และวิธีที่ร้านรับออเดอร์อยู่ตอนนี้ ทีมจะช่วยประเมินว่าต้องใช้หน้าเลือกเมนูอย่างเดียว หรือควรเพิ่มขั้นตอนยืนยันกับร้าน พร้อมแจ้งค่าเริ่มต้นและค่าใช้จ่ายรายปีก่อนตกลงงาน</p>
      <Link className="quote-cta" to={scopeUrl(SITE_MAP.CONTACT, 'ชุดรับออเดอร์ LINE')}>สอบถามชุดรับออเดอร์ LINE</Link></aside>
  </QuoteWorkshop>;
}
