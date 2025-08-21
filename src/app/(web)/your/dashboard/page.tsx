import React from 'react';
// import CustomerAgentTrackingMap from '../../../../components/dashboard/customer/CustomerAgentTrackingMap';
import CustomerBookParcel from '../../../../components/dashboard/customer/CustomerBookParcel';
import CustomerTrackParcel from '../../../../components/dashboard/customer/CustomerTrackParcel';
import CustomerParcels from '../../../../components/dashboard/customer/CustomerParcels';

const page = () => {
  return (
    <>
      {/* <CustomerAgentTrackingMap /> */}
      <CustomerBookParcel />
      <CustomerTrackParcel />
      <CustomerParcels />
    </>
  );
};

export default page;
