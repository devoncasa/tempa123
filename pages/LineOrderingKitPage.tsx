import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

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
    { id: 1, name: 'ข้าวมันไก่ต้ม', price: 50, image: 'https://images.unsplash.com/photo-1626084059905-4ac6e36872a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'ข้าวมันไก่ทอด', price: 50, image: 'https://images.unsplash.com/photo-1599499801123-7790b50a2f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'ข้าวมันไก่ผสม', price: 60, image: 'https://images.unsplash.com/photo-1625944230153-a19bceb3a3c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
];

const BANK_DATA = [
    { name: 'Bangkok Bank', scheme: 'bblmarket://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/bbl.webp' },
    { name: 'Krungsri', scheme: 'krungsri-mobile://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/bay.webp' },
    { name: 'CIMB Thai', scheme: 'cimbthai-digital-banking://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/cimb.webp' },
    { name: 'KBank', scheme: 'kplus://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/kbank.webp' },
    { name: 'Kiatnakin Phatra', scheme: 'kkpmobile://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/kkp.webp' },
    { name: 'Krungthai Bank', scheme: 'krungthainext://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/ktb.webp' },
    { name: 'SCB', scheme: 'scbeasy://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/scb.webp' },
    { name: 'ttb', scheme: 'ttb-touch://', logo: 'https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/images/line-kit/ttb.webp' },
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
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Shop Hero" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-2 left-3">
                        <h3 className="text-white text-2xl font-bold">ร้านข้าวมันไก่เจ๊วรรณ</h3>
                        <p className="text-white text-sm">ข้าวมันไก่สูตรต้นตำรับ เปิดมานานกว่า 30 ปี</p>
                    </div>
                </div>

                {/* Menu */}
                <div className="p-4 space-y-4">
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
                {cartItemCount > 0 && !showCart && (
                    <button onClick={() => setShowCart(true)} className="fixed bottom-20 right-8 bg-kit-action text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl z-20">
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
                    <div className="absolute inset-0 bg-black/50 z-30 flex justify-end">
                        <div className="bg-white w-full max-w-sm h-full flex flex-col p-4">
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
                                    <a href={bank.scheme} key={bank.name} className="block">
                                        <img src={bank.logo} alt={bank.name} className="w-full object-contain rounded-md shadow-sm" />
                                    </a>
                                ))}
                            </div>

                            <label htmlFor="slip-upload" className="w-full block bg-kit-action text-white py-3 my-4 rounded-lg font-bold cursor-pointer">
                                {slipFile ? `✔️ ${slipFile.name}` : 'อัปโหลดสลิป'}
                            </label>
                            <input id="slip-upload" type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />

                            <button
                                onClick={handleConfirmOrder}
                                disabled={!slipFile}
                                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                ยืนยันการสั่งซื้อ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const LineOrderingKitPage: React.FC = () => {
    const CheckmarkIcon = () => (
        <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
    );

    return (
        <>
            <Seo
                title="500 Baht LINE Ordering Kit | Tempa Web.123"
                description="สร้างร้านค้าออนไลน์บน LINE ของคุณเองในราคา 500 บาท ไม่ต้องเสียค่าคอมมิชชั่น ทดลองใช้งานจริงได้เลย"
            />
            <style>{`
                :root {
                    --kit-bg: #FFF7E9;
                    --kit-text: #3D3D3D;
                    --kit-card-bg: #E8F5E9;
                    --kit-action: #FF6B6B;
                    --kit-action-dark: #e05252;
                }
                .font-poppins { font-family: 'Poppins', sans-serif; }
                .bg-kit-bg { background-color: var(--kit-bg); }
                .text-kit-text { color: var(--kit-text); }
                .bg-kit-card { background-color: var(--kit-card-bg); }
                .bg-kit-action { background-color: var(--kit-action); }
                .bg-kit-action:hover { background-color: var(--kit-action-dark); }
                .text-kit-action { color: var(--kit-action); }
                .border-kit-action { border-color: var(--kit-action); }

                /* Phone Frame Styles */
                .phone-frame {
                    position: relative;
                    width: 100%;
                    max-width: 380px;
                    height: 750px;
                    background-color: #111;
                    border-radius: 40px;
                    padding: 15px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    margin: 0 auto;
                }
                .phone-screen {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: var(--kit-card-bg);
                    border-radius: 25px;
                    overflow: hidden;
                    font-family: 'Poppins', sans-serif;
                }
                .phone-frame::before {
                    content: '';
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 150px;
                    height: 25px;
                    background: #111;
                    border-radius: 0 0 15px 15px;
                    z-index: 10;
                }
            `}</style>
            <div className="font-poppins text-kit-text">
                
                {/* Section 1: The Problem */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold">จ่ายค่าคอม 30% ทำไม?</h1>
                        <h2 className="text-2xl md:text-3xl text-kit-action mt-2">เป็นเจ้าของร้านค้าออนไลน์ของคุณเอง</h2>
                        <p className="mt-6 text-lg">สำหรับร้านอาหารและร้านค้าขนาดเล็ก การพึ่งพาแพลตฟอร์มเดลิเวอรี่ใหญ่นั้นสะดวก แต่ก็ต้องแลกมากับค่าคอมมิชชั่นที่สูงถึง 30-35% ซึ่งหมายความว่าทุกๆ 100 บาทที่คุณขายได้ คุณต้องเสียเงิน 30-35 บาทไปกับค่าธรรมเนียม</p>
                    </div>
                </section>

                {/* Section 2: How It Works */}
                <section className="py-16 md:py-24 bg-kit-bg">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ระบบทำงานอย่างไร?</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Core Engine</h3>
                                <p>เว็บแอปพลิเคชันน้ำหนักเบาที่ลูกค้าใช้สั่งซื้อสินค้า</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Payment System</h3>
                                <p>ลูกค้าชำระเงินผ่าน PromptPay QR และอัปโหลดสลิปได้โดยตรง</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Communication Hub</h3>
                                <p>คุณรับออเดอร์และสลิปผ่าน LINE Notify ไม่ต้องใช้แอปอื่น</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Section 3: Live Interactive Demo */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ทดลองใช้งานจริง</h2>
                        <LiveDemo />
                    </div>
                </section>

                {/* Section 4: Customer's Journey */}
                <section className="py-16 md:py-24 bg-kit-bg">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ลูกค้าของคุณจะสั่งซื้อง่ายๆ ใน 5 ขั้นตอน</h2>
                        <div className="space-y-4">
                            {[
                                "สแกน QR Code จากหน้าร้านหรือโซเชียลมีเดีย",
                                "เลือกเมนูที่ต้องการลงตะกร้า",
                                "ชำระเงินผ่าน QR หรือแอปธนาคารในมือถือ",
                                "อัปโหลดสลิปเพื่อยืนยันการชำระเงิน",
                                "รับการแจ้งเตือนและรอรับออเดอร์"
                            ].map((step, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="bg-kit-action text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 5: What You Get */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">สิ่งที่คุณจะได้รับในราคา 500 บาท</h2>
                        <p className="text-center text-lg text-gray-500 mb-8">(ค่าบริการครั้งเดียว ไม่มีรายเดือน)</p>
                        <div className="bg-kit-card p-8 rounded-lg space-y-4">
                            <div className="flex items-start gap-3"><CheckmarkIcon /> <span>เว็บแอปพลิเคชันสำหรับรับออเดอร์ (Master Template)</span></div>
                            <div className="flex items-start gap-3"><CheckmarkIcon /> <span>URL ที่เป็นชื่อร้านของคุณเอง (เช่น `jaewan-chicken.tempa123.com`)</span></div>
                            <div className="flex items-start gap-3"><CheckmarkIcon /> <span>QR Code สำหรับให้ลูกค้าสแกนเพื่อสั่งซื้อ</span></div>
                            <div className="flex items-start gap-3"><CheckmarkIcon /> <span>ระบบแจ้งเตือนออเดอร์เข้าผ่าน LINE Notify</span></div>
                            <div className="flex items-start gap-3"><CheckmarkIcon /> <span>คู่มือการใช้งานและการตั้งค่าเบื้องต้น</span></div>
                        </div>
                    </div>
                </section>
                
                {/* Section 6: Add-Ons */}
                <section className="py-16 md:py-24 bg-kit-bg">
                     <div className="container mx-auto px-6 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">พร้อมเติบโต? บริการเสริมของเรา</h2>
                        <div className="space-y-4">
                             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <h3 className="font-bold text-xl">ใส่เมนูและรูปภาพให้</h3>
                                <p className="text-2xl font-bold text-kit-action my-2">500 บาท</p>
                                <p className="text-sm">(สูงสุด 10 เมนู)</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <h3 className="font-bold text-xl">ออกแบบภาพ QR Code สวยๆ</h3>
                                <p className="text-2xl font-bold text-kit-action my-2">500 บาท</p>
                                <p className="text-sm">(สำหรับติดหน้าร้าน)</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <h3 className="font-bold text-xl">เชื่อมต่อ Domain ของคุณเอง</h3>
                                <p className="text-2xl font-bold text-kit-action my-2">1,000 บาท</p>
                                <p className="text-sm">(เช่น `www.jaewanchicken.com`)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 bg-kit-action">
                    <div className="container mx-auto px-6 text-center">
                         <h2 className="text-3xl font-bold text-white mb-6">สร้างร้านค้า LINE ของคุณวันนี้!</h2>
                        <Link to="/contact" className="inline-block bg-white text-kit-action font-bold py-4 px-10 rounded-lg text-xl transition transform hover:scale-105">
                            เริ่มต้นใช้งานชุด LINE Ordering Kit ของคุณเลย!
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LineOrderingKitPage;
