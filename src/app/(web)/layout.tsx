import React from 'react';
import Header from '@/components/layouts/Header';
import Footer from '../../components/layouts/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
