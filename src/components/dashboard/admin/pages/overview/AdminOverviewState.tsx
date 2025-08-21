'use client';

import { Card, CardAction, CardHeader, CardTitle } from '../../../../ui/card';
import Heading from '../../../../ui/heading';
import { AlertTriangle, CircleCheck, Clock, Package2 } from 'lucide-react';

const AdminOverviewState = () => {
  return (
    <section>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              ASSIGNED PARCELS
            </CardTitle>
            <CardAction>
              <span className="size-12 flex items-center justify-center bg-sky-500/25 rounded-md">
                <Package2 className="stroke-sky-500 size-7" />
              </span>
            </CardAction>
            <Heading as="h5">8</Heading>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              TODAY&apos;S DELIVERIES
            </CardTitle>
            <CardAction>
              <span className="size-12 flex items-center justify-center bg-green-500/25 rounded-md">
                <CircleCheck className="stroke-green-500 size-7" />
              </span>
            </CardAction>
            <Heading as="h5">5</Heading>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              PENDING PICKUPS
            </CardTitle>
            <CardAction>
              <span className="size-12 flex items-center justify-center bg-yellow-500/25 rounded-md">
                <Clock className="stroke-yellow-500 size-7" />
              </span>
            </CardAction>
            <Heading as="h5">3</Heading>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">EXCEPTIONS</CardTitle>
            <CardAction>
              <span className="size-12 flex items-center justify-center bg-red-500/25 rounded-md">
                <AlertTriangle className="stroke-red-500 size-7" />
              </span>
            </CardAction>
            <Heading as="h5">2</Heading>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default AdminOverviewState;
