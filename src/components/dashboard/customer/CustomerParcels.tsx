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
import { dummyParcel } from './data/dummyParcel';

const CustomerParcels = () => {
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
                {dummyParcel.map((parcel) => (
                  <TableRow key={parcel.trackingId}>
                    <TableCell>{parcel.trackingId}</TableCell>
                    <TableCell>{parcel.from}</TableCell>
                    <TableCell>{parcel.to}</TableCell>
                    <TableCell>{parcel.bookingDate}</TableCell>
                    <TableCell>{parcel.status}</TableCell>
                    <TableCell>
                      <button className="text-blue-500 hover:underline">
                        {parcel.action}
                      </button>
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
