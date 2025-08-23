import React from 'react';
import AdminOverviewState from '../../../../components/ui/dashboard/admin/pages/overview/AdminOverviewState';
import AdminOverviewAnalytics from '../../../../components/ui/dashboard/admin/pages/overview/AdminOverviewAnalytics';
import AdminDataTable from '../../../../components/ui/dashboard/admin/pages/overview/AdminDataTable';

const page = () => {
  return (
    <>
      <AdminOverviewState />
      <AdminOverviewAnalytics />
      <AdminDataTable />
    </>
  );
};

export default page;
