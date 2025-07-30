
import React from 'react';

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary font-poppins mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card for Template Management */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold font-poppins mb-4">Template Management</h2>
            <p className="text-gray-600 mb-4">View, edit, and approve new template submissions.</p>
            <button className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90">
              Manage Templates
            </button>
          </div>

          {/* Card for Sales Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold font-poppins mb-4">Sales Overview</h2>
            <p className="text-gray-600 mb-4">Track sales performance and revenue analytics.</p>
            <button className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90">
              View Analytics
            </button>
          </div>

          {/* Card for Site Settings */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold font-poppins mb-4">Site Settings</h2>
            <p className="text-gray-600 mb-4">Configure global site settings and manage users.</p>
            <button className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90">
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
