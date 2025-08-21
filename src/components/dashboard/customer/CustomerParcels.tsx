'use client';

import React from 'react';
import Heading from '../../ui/heading';
import { Card } from '../../ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../ui/table';
import { useGetCustomerParcelsQuery } from '../../../lib/features/services/parcel/parcelApi';

const CustomerParcels = () => {
  const { data } = useGetCustomerParcelsQuery({});

  return (
    <section>
      <div className="container">
        <div className="space-y-10">
          <Heading
            as="h4"
            className="section-title text-center relative pb-2.5"
          >
            Your Parcel History
          </Heading>
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((parcel, i) => (
                  <TableRow key={i}>
                    <TableCell>{parcel.trackingId}</TableCell>
                    <TableCell>{parcel.pickupAddress}</TableCell>
                    <TableCell>{parcel.deliveryAddress}</TableCell>
                    <TableCell>{parcel.updatedAt?.toLocaleString()}</TableCell>
                    <TableCell>{parcel.status}</TableCell>
                    <TableCell>view</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomerParcels;
