import React from 'react';
import CustomerDashboardHeader from '../../../components/dashboard/customer/layouts/CustomerDashboardHeader';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomerDashboardHeader />
      <main className="p-4 space-y-4">{children}</main>
    </>
  );
};

export default AdminDashboardLayout;
