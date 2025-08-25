'use client';

import React, { useEffect } from 'react';
import AdminOverviewState from '../../../../components/dashboard/admin/pages/overview/AdminOverviewState';
import AdminOverviewAnalytics from '../../../../components/dashboard/admin/pages/overview/AdminOverviewAnalytics';
import AdminAvailableAgent from '../../../../components/dashboard/admin/pages/overview/AdminAvailableAgent';
import { createSocket } from '../../../../lib/socket';

const AdminOverview = () => {
  useEffect(() => {
    const socket = createSocket('agent');

    socket.on('locationUpdate', (data) => {
      console.log('Received location update:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <AdminOverviewState />
      <AdminOverviewAnalytics />
      <AdminAvailableAgent />
    </>
  );
};

export default AdminOverview;
