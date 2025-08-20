import React from 'react';

const HomeWhyChoose = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose QuickShip?
          </h2>
          <p className="text-xl text-gray-600">
            Our comprehensive courier management system offers everything you
            need to streamline your delivery operations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-map-marker-alt" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Real-Time Tracking
            </h3>
            <p className="text-gray-600">
              Track parcels in real-time with our advanced GPS technology.
              Provide customers with accurate delivery estimates.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-route" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Optimized Routes
            </h3>
            <p className="text-gray-600">
              AI-powered route optimization to reduce delivery times and fuel
              costs while maximizing efficiency.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-user-cog" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Role Management
            </h3>
            <p className="text-gray-600">
              Comprehensive role-based access for admins, agents, and customers
              with appropriate permissions.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-file-invoice-dollar" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              COD Management
            </h3>
            <p className="text-gray-600">
              Efficiently handle cash on delivery transactions with integrated
              payment tracking and reporting.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-chart-line" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Analytics &amp; Reports
            </h3>
            <p className="text-gray-600">
              Generate detailed reports and gain insights into your delivery
              performance and business metrics.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              <i className="fas fa-mobile-alt" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Mobile App
            </h3>
            <p className="text-gray-600">
              Our mobile app allows delivery agents to update statuses and
              customers to track parcels on the go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChoose;
