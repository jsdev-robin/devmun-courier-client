import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
];

const contacts = [
  {
    icon: MapPin,
    text: 'Kewarjani, Manikganj-1800, Dhaka, BD',
  },
  {
    icon: Phone,
    text: '01763408494',
  },
  {
    icon: Mail,
    text: 'jsdev.robin@gmail.com',
  },
];

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              About QuickShip
            </h3>
            <p className="text-gray-300">
              QuickShip is a comprehensive courier and parcel management system
              designed to streamline your delivery operations and enhance
              customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contacts.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start">
                  <Icon className="mt-1 mr-3 text-gray-300" size={18} />
                  <span className="text-gray-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2025 QuickShip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
