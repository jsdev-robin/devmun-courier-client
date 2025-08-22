import React from 'react';
import CustomerDashboardHeader from '../../../components/dashboard/customer/layouts/CustomerDashboardHeader';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomerDashboardHeader />
      <main className="py-6 space-y-20">{children}</main>
    </>
  );
};

export default AdminDashboardLayout;
