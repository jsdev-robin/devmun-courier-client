'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Banknote, Clock, Package2, Truck, XCircle } from 'lucide-react';
import Typography from '@/components/ui/typography';
import Heading from '@/components/ui/heading';
import { createSocket } from '../../../../../lib/socket';
import useUser from '../../../../../guard/useUser';
import { useGetParcelAnalyticsByAgentQuery } from '../../../../../lib/features/services/agentControl/agentControllApi';
import { Skeleton } from '../../../../ui/skeleton';
import { formatStatusText } from '../../../../../utils/formatStatusText';

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

  const { data, isLoading, isError } = useGetParcelAnalyticsByAgentQuery({
    startDate: '2025-08-24',
    endDate: '2025-08-26',
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'picked_up':
        return {
          icon: Package2,
          borderColor: 'border-t-green-600',
          bgColor: 'bg-green-600/25',
          iconColor: 'stroke-green-500',
          textColor: 'text-green-500',
        };
      case 'in_transit':
        return {
          icon: Truck,
          borderColor: 'border-t-yellow-600',
          bgColor: 'bg-yellow-600/25',
          iconColor: 'stroke-yellow-500',
          textColor: 'text-yellow-500',
        };
      case 'delivered':
        return {
          icon: Banknote,
          borderColor: 'border-t-blue-600',
          bgColor: 'bg-blue-600/25',
          iconColor: 'stroke-blue-500',
          textColor: 'text-blue-500',
        };
      case 'failed':
        return {
          icon: XCircle,
          borderColor: 'border-t-red-600',
          bgColor: 'bg-red-600/25',
          iconColor: 'stroke-red-500',
          textColor: 'text-red-500',
        };
      case 'booked':
      default:
        return {
          icon: Clock,
          borderColor: 'border-t-gray-600',
          bgColor: 'bg-gray-600/25',
          iconColor: 'stroke-gray-500',
          textColor: 'text-gray-500',
        };
    }
  };

  return (
    <section>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isError ? (
          <div>Error</div>
        ) : isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </>
        ) : (
          <>
            {data?.data.analytics.map((item, i) => {
              const config = getStatusConfig(item._id);
              const IconComponent = config.icon;

              return (
                <Card
                  className={`${config.borderColor} transition-all border-t-2 duration-500 hover:-translate-y-0.5`}
                  key={i}
                >
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <span
                        className={`size-12 rounded-md flex items-center justify-center ${config.bgColor}`}
                      >
                        <IconComponent className={config.iconColor} />
                      </span>
                      <div className="space-y-0.5">
                        <Typography
                          variant="sm"
                          textColor="muted"
                          weight="medium"
                        >
                          {formatStatusText(item._id)}
                        </Typography>
                        <div className="flex items-center gap-3">
                          <Heading as="h5">{item.count}</Heading>
                          <span
                            className={`${config.textColor} text-sm font-semibold`}
                          >
                            {item.count > 0
                              ? '+0 from yesterday'
                              : 'No parcels'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default AgentOverviewStats;
