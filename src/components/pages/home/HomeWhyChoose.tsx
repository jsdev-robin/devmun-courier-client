import {
  ChartLine,
  MapPin,
  Receipt,
  Route,
  Smartphone,
  UserRoundCog,
} from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description:
      'Track parcels in real-time with our advanced GPS technology. Provide customers with accurate delivery estimates.',
  },
  {
    icon: Route,
    title: 'Optimized Routes',
    description:
      'AI-powered route optimization to reduce delivery times and fuel costs while maximizing efficiency.',
  },
  {
    icon: UserRoundCog,
    title: 'Role Management',
    description:
      'Comprehensive role-based access for admins, agents, and customers with appropriate permissions.',
  },
  {
    icon: Receipt,
    title: 'COD Management',
    description:
      'Efficiently handle cash on delivery transactions with integrated payment tracking and reporting.',
  },
  {
    icon: ChartLine,
    title: 'Analytics & Reports',
    description:
      'Generate detailed reports and gain insights into your delivery performance and business metrics.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description:
      'Our mobile app allows delivery agents to update statuses and customers to track parcels on the go.',
  },
];

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
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChoose;
