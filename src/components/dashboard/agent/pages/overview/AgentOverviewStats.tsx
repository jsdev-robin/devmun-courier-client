'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Banknote, Clock, Package2, Truck } from 'lucide-react';
import Typography from '@/components/ui/typography';
import Heading from '@/components/ui/heading';
import { createSocket } from '../../../../../lib/socket';
import useUser from '../../../../../guard/useUser';

const customerSocket = createSocket('customer');

const AgentOverviewStats = () => {
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-t-4 border-t-green-600 transition-all duration-500 hover:-translate-y-0.5">
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="size-12 rounded-md flex items-center justify-center bg-green-600/25">
                <Package2 className="stroke-green-500" />
              </span>
              <div className="space-y-0.5">
                <Typography variant="sm" textColor="muted" weight="medium">
                  Assigned Parcels
                </Typography>
                <div className="flex items-center gap-3">
                  <Heading as="h5">5</Heading>
                  <span className="text-green-500 text-sm font-semibold">
                    2 from yesterday
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-yellow-600 transition-all duration-500 hover:-translate-y-0.5">
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="size-12 rounded-md flex items-center justify-center bg-yellow-600/25">
                <Clock className="stroke-yellow-500" />
              </span>
              <div className="space-y-0.5">
                <Typography variant="sm" textColor="muted" weight="medium">
                  To Be Picked Up
                </Typography>
                <div className="flex items-center gap-3">
                  <Heading as="h5">2</Heading>
                  <span className="text-yellow-500 text-sm font-semibold">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-blue-600 transition-all duration-500 hover:-translate-y-0.5">
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="size-12 rounded-md flex items-center justify-center bg-blue-600/25">
                <Truck className="stroke-blue-500" />
              </span>
              <div className="space-y-0.5">
                <Typography variant="sm" textColor="muted" weight="medium">
                  In Transit
                </Typography>
                <div className="flex items-center gap-3">
                  <Heading as="h5">2</Heading>
                  <span className="text-blue-500 text-sm font-semibold">
                    On schedule
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-sky-600 transition-all duration-500 hover:-translate-y-0.5">
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="size-12 rounded-md flex items-center justify-center bg-sky-600/25">
                <Banknote className="stroke-sky-500" />
              </span>
              <div className="space-y-0.5">
                <Typography variant="sm" textColor="muted" weight="medium">
                  Today&apos;s Earnings
                </Typography>
                <div className="flex items-center gap-3">
                  <Heading as="h5">USD 1,250</Heading>
                  <span className="text-sky-500 text-sm font-semibold">
                    +210
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AgentOverviewStats;
