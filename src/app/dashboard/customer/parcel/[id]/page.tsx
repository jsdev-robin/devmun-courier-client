'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CustomerParcelDetails from '../../../../../components/dashboard/customer/pages/parcel/CustomerParcelDetails';

const CustomerParcelDetailsPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <>
      <CustomerParcelDetails id={params.id} />
    </>
  );
};

export default CustomerParcelDetailsPage;
