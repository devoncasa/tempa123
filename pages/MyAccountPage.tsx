import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Seo from '../components/Seo';

const MyAccountPage: React.FC = () => {
    const { user, logout } = useAuth();
    
    const quotaPercentage = user.downloadsPerMonth > 0 ? (user.downloadsRemaining / user.downloadsPerMonth) * 100 : 0;
    
    const nextResetDate = new Date();
    nextResetDate.setMonth(nextResetDate.getMonth() + 1, 1);

    return (
        <>
            <Seo
                title="My Account | Tempa Web.123"
                description="Manage your account, view your package details, and track your download quota."
            />
            <section className="bg-bg-section-dark py-16 md:py-24">
              <div className="container mx-auto px-6 lg:px-[8vw]">
                  <div className="max-w-2xl mx-auto">
                      <h1 className="text-4xl font-bold font-poppins text-text-primary mb-2">My Account</h1>
                      <p className="text-lg text-text-secondary">Welcome back, <span className="font-semibold text-brand-700">{user.username}</span>!</p>

                      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg border border-border-primary">
                          <h2 className="text-2xl font-poppins font-bold mb-6">Subscription Details</h2>
                          
                          <div className="space-y-4">
                              <div>
                                  <p className="text-sm text-grey-600">Username</p>
                                  <p className="text-lg font-semibold">{user.username}</p>
                              </div>
                              <div>
                                  <p className="text-sm text-grey-600">Package Tier</p>
                                  <p className="text-lg font-semibold capitalize bg-brand-100 text-brand-700 px-3 py-1 rounded-full inline-block">{user.packageTier}</p>
                              </div>
                              {user.packageTier !== 'none' && (
                                  <div>
                                      <p className="text-sm text-grey-600 mb-2">Inspiration Gallery Quota</p>
                                      <div className="w-full bg-gray-200 rounded-full h-4">
                                          <div 
                                              className="bg-primary h-4 rounded-full transition-all duration-500"
                                              style={{ width: `${quotaPercentage}%`}}
                                          ></div>
                                      </div>
                                      <div className="flex justify-between text-sm mt-1">
                                          <span className="font-semibold">{user.downloadsRemaining} / {user.downloadsPerMonth} downloads remaining</span>
                                          <span className="text-text-secondary">Resets on {nextResetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                      </div>
                                  </div>
                              )}
                          </div>
                          
                          <button 
                              onClick={logout}
                              className="mt-8 w-full md:w-auto bg-accent text-white py-3 px-8 rounded-lg uppercase text-sm font-semibold tracking-wide-sm hover:bg-opacity-90 transition-all duration-300"
                          >
                              Logout
                          </button>
                      </div>
                  </div>
              </div>
            </section>
        </>
    );
};

export default MyAccountPage;