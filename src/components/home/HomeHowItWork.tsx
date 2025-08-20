import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Book a Parcel',
    description: 'Create a shipment with pickup and delivery details',
  },
  {
    number: 2,
    title: 'Assign Agent',
    description: 'Assign the delivery to an available agent',
  },
  {
    number: 3,
    title: 'Track Delivery',
    description: 'Monitor the parcel in real-time',
  },
  {
    number: 4,
    title: 'Receive Confirmation',
    description: 'Get delivery confirmation and feedback',
  },
];

const HomeHowItWork = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to manage your deliveries efficiently
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between max-w-5xl mx-auto">
          {steps.map(({ number, title, description }, i) => (
            <div
              key={i}
              className="relative text-center px-6 py-4 lg:w-1/4 mb-10 lg:mb-0"
            >
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                {number}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
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

export default HomeHowItWork;
