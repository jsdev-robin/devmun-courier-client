'use client';

import React from 'react';
import CustomerParcelDetails from '../../../../../components/ui/dashboard/customer/pages/parcel/CustomerParcelDetails';
import { useParams } from 'next/navigation';

const CustomerParcelDetailsPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <>
      <CustomerParcelDetails id={params.id} />
    </>
  );
};

export default CustomerParcelDetailsPage;
