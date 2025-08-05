import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TEMPLATES, CATEGORIES } from '../constants';
import { SITE_MAP } from '../src/siteMap';
import { ASSETS } from '../src/assets';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
    const activeClass = 'bg-brand-700 text-white';
    const inactiveClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';
    return (
        <NavLink to={to} className={({ isActive }) => `${isActive ? activeClass : inactiveClass} group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors`}>
            {icon}
            {label}
        </NavLink>
    );
};

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();
    return (
        <div className="w-64 bg-grey-900 text-white flex flex-col flex-shrink-0">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <img src={ASSETS.LOGO_DARK} alt="Tempa Web.123 Logo" className="h-10 w-auto brightness-0 invert" />
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavItem to={SITE_MAP.ADMIN_DASHBOARD} icon={<svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} label="Dashboard" />
                <NavItem to={SITE_MAP.ADMIN_TEMPLATES} icon={<svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} label="Templates" />
                <NavItem to={SITE_MAP.ADMIN_SUBMISSIONS} icon={<svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>} label="Submissions" />
                <NavItem to={SITE_MAP.ADMIN_SALES} icon={<svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} label="Sales & Members" />
                <NavItem to={SITE_MAP.ADMIN_SETTINGS} icon={<svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label="Site Settings" />
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button onClick={logout} className="w-full bg-brand-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center">
                   <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                </button>
            </div>
        </div>
    );
};

const DashboardCard: React.FC<{ title: string, value: string, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center border border-grey-200">
        <div className="p-3 rounded-full bg-brand-100 text-brand-700 mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-grey-600">{title}</p>
            <p className="text-2xl font-bold font-poppins text-grey-900">{value}</p>
        </div>
    </div>
);

const DashboardPage = () => (
    <div>
        <h1 className="text-3xl font-bold font-poppins text-grey-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard title="Revenue (This Month)" value="$4,280" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
            <DashboardCard title="New Memberships" value="32" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>} />
            <DashboardCard title="Active Members" value="415" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            <DashboardCard title="Templates Live" value="94" icon={<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
            <p className="font-bold">Pending Items</p>
            <p>You have <strong>3 creator submissions</strong> awaiting review. <NavLink to={SITE_MAP.ADMIN_SUBMISSIONS} className="font-bold underline hover:text-yellow-800">View submissions</NavLink>.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Top 5 Best-Selling Templates</h2>
                <ul className="space-y-3">
                    {TEMPLATES.slice(0, 5).map((t, i) => <li key={t.id} className="flex justify-between items-center text-sm"><span className="font-medium text-grey-900">{t.name}</span> <span className="font-mono text-brand-700 bg-brand-100 px-2 py-1 rounded-md">{124 - i*15} sales</span></li>)}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                    <li className="flex items-center text-sm"><span className="bg-green-500 h-2 w-2 rounded-full mr-3"></span><div>Template 'The Urban Retreat' sold. <span className="text-gray-400">5m ago</span></div></li>
                    <li className="flex items-center text-sm"><span className="bg-blue-500 h-2 w-2 rounded-full mr-3"></span><div>New Yearly Membership from user@example.com. <span className="text-gray-400">1h ago</span></div></li>
                    <li className="flex items-center text-sm"><span className="bg-green-500 h-2 w-2 rounded-full mr-3"></span><div>Template 'The Potter's Wheel' sold. <span className="text-gray-400">3h ago</span></div></li>
                </ul>
            </div>
        </div>
    </div>
);

const TemplateManagerPage = () => {
    const [filter, setFilter] = useState('All');
    return (
        <div>
            <h1 className="text-3xl font-bold font-poppins text-grey-900 mb-8">Template Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 font-bold">Name</th><th className="p-4 font-bold">Category</th><th className="p-4 font-bold">Status</th><th className="p-4 font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TEMPLATES.slice(0, 10).map(t => (
                            <tr key={t.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">{t.name}</td><td className="p-4 text-grey-600">{t.category}</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Published</span></td>
                                <td className="p-4 space-x-2">
                                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                                    <button className="text-gray-600 hover:underline text-sm">View</button>
                                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const SubmissionsPage = () => (
    <div>
        <h1 className="text-3xl font-bold font-poppins text-grey-900 mb-8">Creator Submissions</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold font-poppins mb-4">Pending Review (3)</h2>
            <div className="space-y-4">
                {/* Mock Submission 1 */}
                <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <p className="font-bold">"Elegant Eats" by John Doe</p>
                        <p className="text-sm text-grey-600">Category: Food & Cafe</p>
                    </div>
                    <div className="space-x-2">
                        <button className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">Preview</button>
                        <button className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-opacity-90">Review</button>
                    </div>
                </div>
                {/* Mock Submission 2 */}
                <div className="border rounded-lg p-4 flex justify-between items-center">
                     <div>
                        <p className="font-bold">"Minimalist Portfolio" by Jane Smith</p>
                        <p className="text-sm text-grey-600">Category: Portfolio</p>
                    </div>
                    <div className="space-x-2">
                        <button className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">Preview</button>
                        <button className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-opacity-90">Review</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SalesPage = () => (
    <div>
        <h1 className="text-3xl font-bold font-poppins text-grey-900 mb-8">Sales & Memberships</h1>
         <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Recent Transactions</h2>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="p-4 font-bold">Template</th><th className="p-4 font-bold">Customer</th><th className="p-4 font-bold">Amount</th><th className="p-4 font-bold">Date</th></tr></thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50"><td className="p-4 font-medium">The Urban Retreat</td><td className="p-4">test@test.com</td><td className="p-4 font-mono">$79.00</td><td className="p-4">2024-07-29</td></tr>
                        <tr className="border-b hover:bg-gray-50"><td className="p-4 font-medium">The Potter's Wheel</td><td className="p-4">user@example.com</td><td className="p-4 font-mono">$69.00</td><td className="p-4">2024-07-28</td></tr>
                    </tbody>
                </table>
            </div>
    </div>
);

const SettingsPage = () => (
    <div>
        <h1 className="text-3xl font-bold font-poppins text-grey-900 mb-8">Site Settings</h1>
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Pricing Rules</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-grey-900">Price increase per 100 sales</label>
                        <input type="number" defaultValue="5" className="mt-1 p-2 border rounded-md w-full md:w-1/3" />
                        <p className="text-xs text-grey-600 mt-1">Percentage increase to apply after every 100 sales.</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Promotions</h2>
                 <input type="text" placeholder="New discount code (e.g., SUMMER25)" className="p-2 border rounded-md w-full md:w-1/2" />
                 <button className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">Add</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold font-poppins mb-4">Homepage Featured Templates</h2>
                <p className="text-grey-600">Drag and drop to reorder. Current featured templates:</p>
                <ul className="mt-4 space-y-2">
                    {TEMPLATES.slice(0, 4).map(t => <li key={t.id} className="p-3 bg-gray-100 rounded-md cursor-move">{t.name}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

const AdminPortal: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[999] bg-grey-900 font-inter text-grey-900">
            <div className="flex h-screen">
                <AdminSidebar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 lg:px-[8vw] py-8">
                        <Routes>
                            <Route path="/" element={<Navigate to={SITE_MAP.ADMIN_DASHBOARD} replace />} />
                            <Route path={SITE_MAP.ADMIN_DASHBOARD} element={<DashboardPage />} />
                            <Route path={SITE_MAP.ADMIN_TEMPLATES} element={<TemplateManagerPage />} />
                            <Route path={SITE_MAP.ADMIN_SUBMISSIONS} element={<SubmissionsPage />} />
                            <Route path={SITE_MAP.ADMIN_SALES} element={<SalesPage />} />
                            <Route path={SITE_MAP.ADMIN_SETTINGS} element={<SettingsPage />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPortal;