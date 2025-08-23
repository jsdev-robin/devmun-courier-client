import React from 'react';
import AdminOverviewState from '../../../../components/dashboard/admin/pages/overview/AdminOverviewState';
import AdminOverviewAnalytics from '../../../../components/dashboard/admin/pages/overview/AdminOverviewAnalytics';
import AdminAvailableAgent from '../../../../components/dashboard/admin/pages/overview/AdminAvailableAgent';

const page = () => {
  return (
    <>
      <AdminOverviewState />
      <AdminOverviewAnalytics />
      <AdminAvailableAgent />
    </>
  );
};

export default page;
