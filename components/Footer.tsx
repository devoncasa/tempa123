import React from 'react';
import {Link} from 'react-router-dom';
export default function Footer(){
  return <footer className="studio-foot"><div><Link to="/" className="studio-logo">Tempa<span>123</span></Link><p>แบบเว็บไซต์และบริการปรับแต่งสำหรับธุรกิจ</p></div>
  <nav aria-label="ข้อมูลเพิ่มเติม"><Link to="/about">เกี่ยวกับเรา</Link><Link to="/pricing">ขอบเขตและราคา</Link><Link to="/line-ordering-kit">ระบบรับออเดอร์ LINE</Link><Link to="/services/multilingual-websites">เว็บไซต์หลายภาษา</Link><Link to="/contact">ติดต่อ</Link></nav><a href="tel:+66818519922">+66 81 851 9922</a></footer>;
}
