import React from 'react';
import CustomerAgentTrackingMap from '../../../../components/dashboard/customer/pages/overview/CustomerAgentTrackingMap';
import CustomerBookParcel from '../../../../components/dashboard/customer/pages/overview/CustomerBookParcel';
import CustomerTrackParcel from '../../../../components/dashboard/customer/pages/overview/CustomerTrackParcel';
import CustomerParcels from '../../../../components/dashboard/customer/pages/overview/CustomerParcels';

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
