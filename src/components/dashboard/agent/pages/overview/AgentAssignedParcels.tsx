import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../ui/table';
import { parcels } from './data/parcel';
import Link from 'next/link';

const AgentAssignedParcels = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Parcels</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.trackingId}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.destination}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/agent/parcel/${item.trackingId}`}
                    className="text-blue-500"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AgentAssignedParcels;
