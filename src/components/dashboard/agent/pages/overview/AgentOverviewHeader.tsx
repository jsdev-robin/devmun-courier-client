import React from 'react';
import { Button } from '../../../../ui/button';
import { QrCode, Route } from 'lucide-react';
import Heading from '../../../../ui/heading';

const AgentOverviewHeader = () => {
  return (
    <section>
      <div className="container">
        <div className="px-4 sm:px-0 flex justify-between items-center mb-8">
          <div>
            <Heading as="h5" className="font-bold">
              Delivery Agent Dashboard
            </Heading>
            <p className="text-sm text-muted-foreground">
              Welcome back, Michael. You have{' '}
              <span className="font-medium text-primary">
                5 assigned parcels
              </span>{' '}
              with{' '}
              <span className="font-medium text-yellow-500">
                2 priority deliveries
              </span>{' '}
              today.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Route /> Optimize Route
            </Button>
            <Button>
              <QrCode /> Scan QR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentOverviewHeader;
