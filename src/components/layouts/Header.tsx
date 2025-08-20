'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <a
            href="#"
            className="flex items-center text-primary text-2xl font-bold mb-4 md:mb-0"
          >
            <i className="fas fa-box mr-3" />
            <span>QuickShip</span>
          </a>
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-5">
              <li>
                <a href="#" className="text-primary font-medium py-2 px-3">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary font-medium py-2 px-3"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary font-medium py-2 px-3"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary font-medium py-2 px-3"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-primary font-medium py-2 px-3"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a
              href="#"
              className="border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition"
            >
              Login
            </a>
            <a
              href="#"
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
