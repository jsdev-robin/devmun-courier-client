import React from 'react';
import Header from '@/components/layouts/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="my-10">{children}</main>
    </>
  );
};

export default MainLayout;
