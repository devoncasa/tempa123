
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 lg:px-[8vw] py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-poppins mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-grey-600 mb-12">
          Have a question, a partnership idea, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-grey-200">
            <h2 className="text-2xl font-bold font-poppins mb-4">Contact Information</h2>
            <p className="text-grey-600 mb-2"><strong>General Inquiries:</strong> <a href="mailto:info@tempa123.com" className="text-brand-700 hover:underline">info@tempa123.com</a></p>
            <p className="text-grey-600 mb-2"><strong>Support:</strong> <a href="mailto:support@tempa123.com" className="text-brand-700 hover:underline">support@tempa123.com</a></p>
            <p className="text-grey-600 mb-2"><strong>Phone:</strong> +66 (0)81 851 9922</p>
            <p className="text-grey-600 mt-4">919/1 JTC Building, Silom Road, Silom, Bangrak, Bangkok 10500, Thailand</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg border border-grey-200">
            <h2 className="text-2xl font-bold font-poppins mb-4">Send Us a Message</h2>
            <p className="text-grey-600">
                Our contact form is under construction. In the meantime, please feel free to reach out to us via email.
            </p>
            <div className="mt-6 bg-gray-100 border-2 border-dashed border-grey-200 rounded-lg p-6 text-center text-grey-600">
                Contact Form Coming Soon
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;