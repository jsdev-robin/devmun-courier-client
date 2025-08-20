import { Info, Play, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HomHero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Fast &amp; Reliable Courier &amp; Parcel Management
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Streamline your delivery process with our advanced courier
              management system. Track parcels in real-time, manage deliveries
              efficiently, and provide exceptional service to your customers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10 justify-center lg:justify-start">
              <Link
                href="#"
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center"
              >
                <Play className="mr-2" /> Watch Demo
              </Link>
              <Link
                href="#"
                className="border border-white border-opacity-50 text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition flex items-center justify-center"
              >
                <Info className="mr-2" /> Learn More
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10 justify-center lg:justify-start">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Parcels Delivered</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-80">On-Time Delivery</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Customer Support</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-white bg-opacity-10 rounded-xl backdrop-blur-sm border border-white border-opacity-20 p-6 w-full max-w-md">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-gray-800 text-xl font-semibold mb-4 text-center">
                  Track Your Parcel
                </h3>
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Enter tracking number"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    title="Search"
                    className="bg-primary text-white px-6 rounded-r-lg"
                  >
                    <Search />
                  </button>
                </div>
                <p className="text-gray-600 text-sm text-center">
                  Don&apos;t know your tracking number?{' '}
                  <a href="#" className="text-primary">
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomHero;
