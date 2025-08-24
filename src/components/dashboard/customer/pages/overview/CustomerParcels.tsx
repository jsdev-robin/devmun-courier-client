'use client';

import React from 'react';
import Heading from '../../../../ui/heading';
import { Card } from '../../../../ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../../ui/table';
import { buttonVariants } from '../../../../ui/button';
import { cn } from '../../../../../lib/utils';
import Link from 'next/link';
import { Badge } from '../../../../ui/badge';
import { getStatusClass } from '../../../../../utils/getStatusColor';
import { useGetParcelByCustomerQuery } from '../../../../../lib/features/services/customerControl/customerControllApi';

const CustomerParcels = () => {
  const { data } = useGetParcelByCustomerQuery({});

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
              <TableHeader className="h-14 bg-primary">
                <TableRow>
                  <TableHead className="text-white font-bold text-sm">
                    Tracking ID
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    From
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    To
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Booking Date
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.data?.map((parcel, i) => (
                  <TableRow key={i}>
                    <TableCell>{parcel.trackingId}</TableCell>
                    <TableCell>{parcel.pickupAddress}</TableCell>
                    <TableCell>{parcel.deliveryAddress}</TableCell>
                    <TableCell>
                      {parcel.updatedAt
                        ? new Date(parcel.updatedAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusClass(parcel.status)}>
                        {parcel.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/customer/parcel/${parcel._id}`}
                        className={cn(buttonVariants({ size: 'sm' }))}
                      >
                        View Details
                      </Link>
                    </TableCell>
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
