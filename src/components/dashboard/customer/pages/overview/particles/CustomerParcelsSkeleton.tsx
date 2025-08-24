'use client';

import React from 'react';
import Heading from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const CustomerParcelsSkeleton = () => {
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
                {[1, 2, 3, 4, 5].map((item) => (
                  <TableRow key={item}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-36" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-9 w-24" />
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

export default CustomerParcelsSkeleton;
