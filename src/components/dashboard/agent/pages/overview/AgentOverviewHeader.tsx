'use client';

import React, { useEffect } from 'react';
import { Button } from '../../../../ui/button';
import { QrCode, Route } from 'lucide-react';
import Heading from '../../../../ui/heading';
import useUser from '../../../../../guard/useUser';
import { createSocket } from '../../../../../lib/socket';

const customerSocket = createSocket('customer');

const AgentOverviewHeader = () => {
  const user = useUser();

  useEffect(() => {
    if (user?._id) {
      if ('geolocation' in navigator) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, speed } = position.coords;
            const speedKmh = speed !== null ? speed * 3.6 : 0;

            customerSocket.emit('agentLocation', {
              customerId: user._id,
              lat: latitude,
              lng: longitude,
              speed: Math.round(speedKmh),
            });
          },
          (err) => console.error(err),
          { enableHighAccuracy: true, maximumAge: 0, timeout: Infinity },
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
          customerSocket.emit('agentDisconnect', user._id);
        };
      }
    }
  }, [user?._id]);

  return (
    <section>
      <div className="container">
        <div className="px-4 sm:px-0 flex justify-between items-center mb-8">
          <div>
            <Heading as="h5" className="font-bold">
              Delivery Agent Dashboard
            </Heading>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.displayName}. You have{' '}
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
