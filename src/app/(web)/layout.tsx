import React from 'react';
import Header from '@/components/layouts/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
