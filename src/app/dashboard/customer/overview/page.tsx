import React from 'react';
import CustomerAgentTrackingMap from '../../../../components/ui/dashboard/customer/pages/overview/CustomerAgentTrackingMap';
import CustomerBookParcel from '../../../../components/ui/dashboard/customer/pages/overview/CustomerBookParcel';
import CustomerTrackParcel from '../../../../components/ui/dashboard/customer/pages/overview/CustomerTrackParcel';
import CustomerParcels from '../../../../components/ui/dashboard/customer/pages/overview/CustomerParcels';

const page = () => {
  return (
    <>
      <CustomerAgentTrackingMap />
      <CustomerBookParcel />
      <CustomerTrackParcel />
      <CustomerParcels />
    </>
  );
};

export default page;
