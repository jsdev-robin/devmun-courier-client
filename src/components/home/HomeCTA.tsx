import React from 'react';

const HomeCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-secondary to-primary text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Courier Business?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-10">
          Join thousands of businesses that use QuickShip to streamline their
          delivery operations and provide exceptional service to their
          customers.
        </p>
        <a
          href="#"
          className="bg-white text-primary px-8 py-4 rounded-lg font-medium inline-flex items-center hover:bg-opacity-90 transition"
        >
          <i className="fas fa-rocket mr-3" /> Get Started Today
        </a>
      </div>
    </section>
  );
};

export default HomeCTA;
