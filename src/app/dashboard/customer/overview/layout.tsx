import React from 'react';
import Header from '@/components/layouts/Header';
import getAdminAgentDal from '../../../../dal/getAdminAgentDal';
import getCustomerDal from '../../../../dal/getCustomerDal';
import Footer from '../../../../components/layouts/Footer';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const agent = await getAdminAgentDal();
  const customer = await getCustomerDal();

  return (
    <>
      <Header
        role={{
          agent: agent.role,
          customer: customer.role,
        }}
      />
      <main className="py-6 space-y-10">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
