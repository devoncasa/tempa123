import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const sections = [['/design-finder','ช่วยเลือกแบบ'],['/catalog','แคตตาล็อก'],['/pricing/customization-services','บริการปรับแต่ง'],['/pricing-calculator','วางแผนงาน'],['/blog','คู่มือ']];
export default function Header() {
  const [open,setOpen] = useState(false);
  const {pathname} = useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className="studio-head"><a href="#main-content" className="skip-main">ข้ามไปยังเนื้อหา</a><div className="studio-bar">
    <Link className="studio-logo" to="/" aria-label="Tempa123 หน้าแรก">Tempa<span>123</span></Link>
    <button className="studio-menu" type="button" aria-expanded={open} aria-controls="studio-nav" onClick={()=>setOpen(!open)}>เมนู {open?'−':'+'}</button>
    <nav id="studio-nav" aria-label="เมนูหลัก" className={open?'open':''} onKeyDown={event=>{if(event.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.studio-menu')?.focus();}}}>
      {sections.map(([path,name])=><NavLink key={path} to={path}>{name}</NavLink>)}
    </nav><Link className="studio-brief" to="/contact">คุยเรื่องเว็บไซต์</Link>
  </div></header>;
}
