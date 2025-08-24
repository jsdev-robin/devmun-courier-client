import React from 'react';
// import CustomerOverviewAgentTracking from '../../../../components/dashboard/customer/pages/overview/CustomerOverviewAgentTracking';
import CustomerBookParcel from '../../../../components/dashboard/customer/pages/overview/CustomerBookParcel';
import CustomerTrackParcel from '../../../../components/dashboard/customer/pages/overview/CustomerTrackParcel';
import CustomerParcels from '../../../../components/dashboard/customer/pages/overview/CustomerParcels';

const CustomerOverviewPage = () => {
  return (
    <>
      {/* <CustomerOverviewAgentTracking /> */}
      <CustomerBookParcel />
      <CustomerTrackParcel />
      <CustomerParcels />
    </>
  );
};

export default CustomerOverviewPage;
