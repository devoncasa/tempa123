

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_MAP } from '../src/siteMap';
import { ASSETS } from '../src/assets';
import { SEO_CONTENT } from '../src/content';

// --- TYPE DEFINITIONS ---
interface MenuItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

// --- MOCK DATA FOR DEMO ---
const DEMO_MENU_ITEMS: MenuItem[] = [
    { id: 1, name: 'ข้าวมันไก่ต้ม', price: 50, image: ASSETS.LINE_ORDERING_KIT.MENU_BOILED_CHICKEN },
    { id: 2, name: 'ข้าวมันไก่ทอด', price: 50, image: ASSETS.LINE_ORDERING_KIT.MENU_FRIED_CHICKEN },
    { id: 3, name: 'ข้าวมันไก่ผสม', price: 60, image: ASSETS.LINE_ORDERING_KIT.MENU_MIXED_CHICKEN },
];

const BANK_DATA = [
    { name: 'Bangkok Bank', scheme: 'bblmarket://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.BBL },
    { name: 'Krungsri', scheme: 'krungsri-mobile://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.BAY },
    { name: 'CIMB Thai', scheme: 'cimbthai-digital-banking://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.CIMB },
    { name: 'KBank', scheme: 'kplus://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.KBANK },
    { name: 'Kiatnakin Phatra', scheme: 'kkpmobile://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.KKP },
    { name: 'Krungthai Bank', scheme: 'krungthainext://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.KTB },
    { name: 'SCB', scheme: 'scbeasy://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.SCB },
    { name: 'ttb', scheme: 'ttb-touch://', logo: ASSETS.LINE_ORDERING_KIT.BANK_LOGOS.TTB },
];

// --- INTERACTIVE DEMO COMPONENT ---
const LiveDemo: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showPayment, setShowPayment] = useState(false);
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const addToCart = (item: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(ci => ci.id === item.id);
            if (existingItem) {
                return prevCart.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };
    
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSlipFile(e.target.files[0]);
        }
    };

    const handleConfirmOrder = () => {
        setOrderConfirmed(true);
        setShowPayment(false);
        setTimeout(() => { // Reset demo after a few seconds
            setOrderConfirmed(false);
            setCart([]);
            setSlipFile(null);
        }, 4000);
    };

    return (
        <div className="phone-frame">
            <div className="phone-screen">
                {/* Header */}
                <div className="relative">
                    <img src={ASSETS.LINE_ORDERING_KIT.SHOP_HERO} alt="Shop Hero" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-2 left-3">
                        <h3 className="text-white text-2xl font-bold">ร้านข้าวมันไก่เจ๊วรรณ</h3>
                        <p className="text-white text-sm">ข้าวมันไก่สูตรต้นตำรับ เปิดมานานกว่า 30 ปี</p>
                    </div>
                </div>

                {/* Menu */}
                <div className="p-4 space-y-4 overflow-y-auto" style={{maxHeight: 'calc(100% - 128px)'}}>
                    {DEMO_MENU_ITEMS.map(item => (
                        <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-1 flex flex-col">
                                <p className="font-bold text-lg text-kit-text">{item.name}</p>
                                <p className="text-kit-text">{item.price} บาท</p>
                                <div className="flex-grow"></div>
                                <button onClick={() => addToCart(item)} className="self-end bg-kit-action text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    เพิ่มลงตะกร้า
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Cart Button */}
                {cartItemCount > 0 && !showCart && !showPayment && !orderConfirmed &&(
                    <button onClick={() => setShowCart(true)} className="absolute bottom-6 right-4 bg-kit-action text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl z-20">
                        🛒<span className="absolute -top-1 -right-1 bg-white text-kit-action text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-kit-action">{cartItemCount}</span>
                    </button>
                )}
                
                {/* Order Confirmed Message */}
                {orderConfirmed && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-50 text-white p-4 text-center">
                        <svg className="w-16 h-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h4 className="text-2xl font-bold">ยืนยันการสั่งซื้อสำเร็จ!</h4>
                        <p>ทางร้านได้รับออเดอร์ของคุณแล้ว</p>
                    </div>
                )}
                
                {/* Cart Modal */}
                {showCart && (
                    <div className="absolute inset-0 bg-black/50 z-30 flex items-end">
                        <div className="bg-white w-full h-[60%] flex flex-col p-4 rounded-t-2xl">
                             <div className="flex justify-between items-center mb-4">
                               <h4 className="text-xl font-bold">สรุปรายการสั่งซื้อ</h4>
                               <button onClick={() => setShowCart(false)} className="font-bold text-2xl">&times;</button>
                            </div>
                            <div className="flex-grow overflow-y-auto space-y-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>{item.price * item.quantity}฿</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-xl">
                                    <span>ยอดรวม</span>
                                    <span>{cartTotal}฿</span>
                                </div>
                                <button onClick={() => { setShowCart(false); setShowPayment(true); }} className="w-full bg-kit-action text-white py-3 rounded-lg mt-4 font-bold">
                                    สั่งซื้อและชำระเงิน
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Payment Modal */}
                {showPayment && (
                    <div className="absolute inset-0 bg-kit-bg z-40 p-4 overflow-y-auto">
                        <div className="text-center">
                             <button onClick={() => setShowPayment(false)} className="absolute top-2 left-2 text-2xl font-bold">&times;</button>
                            <h4 className="text-xl font-bold mt-2">ยืนยันการชำระเงิน</h4>
                            <div className="bg-white p-3 rounded-lg my-4 shadow-sm">
                                <p>ยอดชำระเงินทั้งหมด: <span className="font-bold text-2xl text-kit-action">{cartTotal} บาท</span></p>
                            </div>
                            
                            <p className="font-semibold mb-2">กรุณาชำระเงินผ่าน QR Code หรือเปิดแอปธนาคารด้านล่าง</p>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://tempa123.com&bgcolor=E8F5E9" alt="PromptPay QR" className="mx-auto rounded-lg border-4 border-white shadow-md" />

                            <div className="grid grid-cols-4 gap-3 my-4">
                                {BANK_DATA.map(bank => (
                                    <a key={bank.name} href={bank.scheme} className="p-2 bg-white rounded-lg shadow-sm flex justify-center items-center">
                                        <img src={bank.logo} alt={bank.name} className="h-8" />
                                    </a>
                                ))}
                            </div>
                            <p className="font-semibold my-4">หลังจากชำระเงินแล้ว กรุณาอัปโหลดสลิป</p>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <label htmlFor="slip-upload" className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    <span className="mt-2 text-sm font-medium text-gray-600">{slipFile ? slipFile.name : 'อัปโหลดสลิปที่นี่'}</span>
                                </label>
                                <input id="slip-upload" type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                            </div>
                            <button onClick={handleConfirmOrder} disabled={!slipFile} className="w-full bg-kit-confirm text-white py-3 rounded-lg mt-4 font-bold disabled:bg-gray-400">
                                ยืนยันการสั่งซื้อ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const LineOrderingKitPage: React.FC = () => {
    return (
        <>
            <Seo
                title={SEO_CONTENT.LINE_ORDERING_KIT.title}
                description={SEO_CONTENT.LINE_ORDERING_KIT.description}
            />
            <style>{`
                :root {
                    --kit-bg: #E8F5E9; /* Light Green */
                    --kit-text: #2E7D32; /* Dark Green */
                    --kit-action: #4CAF50; /* Green */
                    --kit-confirm: #FF9800; /* Orange */
                    --kit-brand-header: #00B900; /* LINE Green */
                }
                .phone-frame {
                    position: relative;
                    width: 375px;
                    height: 812px;
                    background-color: #111;
                    border-radius: 40px;
                    padding: 16px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 0 2px #333;
                    margin: 2rem auto;
                }
                .phone-screen {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: var(--kit-bg);
                    border-radius: 24px;
                    overflow: hidden;
                }
            `}</style>
            
            <div>
                <section className="py-16 md:py-24 text-center" style={{background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'}}>
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white leading-tight">
                            ระบบสั่งอาหารผ่าน LINE ในราคา 500 บาท
                        </h1>
                        <p className="text-xl text-green-100 mt-6 max-w-3xl mx-auto leading-relaxed">
                            เปลี่ยน LINE OA ของคุณให้เป็นร้านค้าเต็มรูปแบบ ลูกค้าสั่งง่าย จ่ายสะดวก ไม่ต้องเสียค่า GP
                        </p>
                        <Link to={SITE_MAP.CONTACT} className="mt-8 inline-block bg-white text-kit-text font-bold py-3 px-8 rounded-full text-lg hover:bg-green-50 transition-transform transform hover:scale-105">
                            ติดต่อเราเพื่อเริ่มต้น
                        </Link>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-bg-section-dark">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-6">มันทำงานอย่างไร?</h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    ลูกค้าของคุณสามารถสั่งซื้อได้ง่ายๆ เพียง 3 ขั้นตอน:
                                </p>
                                <ol className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="bg-kit-action text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-xl">1</div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">เลือกเมนู</h3>
                                            <p className="text-gray-600">ลูกค้าเปิดเมนูจาก LINE OA ของคุณ กดเลือกสินค้าที่ต้องการลงตะกร้า</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-kit-action text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-xl">2</div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">ชำระเงิน</h3>
                                            <p className="text-gray-600">ชำระเงินผ่าน QR Code พร้อมเพย์ และสามารถเปิดแอปธนาคารได้โดยตรงจากหน้าเว็บ</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-kit-action text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-xl">3</div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">อัปโหลดสลิป</h3>
                                            <p className="text-gray-600">ลูกค้าอัปโหลดสลิปเพื่อยืนยันการสั่งซื้อ ออเดอร์จะถูกส่งไปที่คุณทันที</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <LiveDemo />
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="py-16 md:py-24 bg-bg-section-light">
                    <div className="container mx-auto px-6 lg:px-[8vw]">
                         <h2 className="text-3xl font-bold font-poppins text-center mb-12 text-gray-800">สิ่งที่คุณจะได้รับในราคา 500 บาท</h2>
                         <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-kit-action">
                                <h3 className="font-bold text-xl mb-2">หน้าเว็บสั่งอาหาร 1 หน้า</h3>
                                <p>เว็บเพจที่พร้อมใช้งานได้ทันทีสำหรับร้านค้าของคุณ</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-kit-action">
                                <h3 className="font-bold text-xl mb-2">ระบบ QR Code Payment</h3>
                                <p>สร้าง QR Code สำหรับรับเงินจากเบอร์พร้อมเพย์ของคุณ</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-kit-action">
                                <h3 className="font-bold text-xl mb-2">เมนูสวยงาม</h3>
                                <p>เราจะใส่ข้อมูลเมนูของคุณให้ (สูงสุด 10 รายการ)</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-kit-action">
                                <h3 className="font-bold text-xl mb-2">ระบบแจ้งเตือนผ่าน LINE</h3>
                                <p>เมื่อมีออเดอร์ใหม่ คุณจะได้รับการแจ้งเตือนทันที</p>
                            </div>
                         </div>
                         <div className="text-center mt-12">
                             <p className="text-gray-600">* ราคานี้เป็นค่าติดตั้งครั้งแรก ไม่รวมค่าโฮสติ้งรายปี (ประมาณ 1,500 บาท)</p>
                             <Link to={SITE_MAP.CONTACT} className="mt-6 inline-block bg-kit-action text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-green-600 transition-transform transform hover:scale-105">
                                สนใจแพ็กเกจนี้? ติดต่อเรา
                            </Link>
                         </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LineOrderingKitPage;