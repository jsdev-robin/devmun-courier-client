'use client';

import React, { useEffect } from 'react';
import AgentOverviewStats from '../../../../components/dashboard/agent/pages/overview/AgentOverviewStats';
import AgentAssignedParcels from '../../../../components/dashboard/agent/pages/overview/AgentAssignedParcels';

import { createSocket } from '../../../../lib/socket';
import useUser from '../../../../guard/useUser';

const AgentOverviewStatsPage = () => {
  const user = useUser();

  useEffect(() => {
    if (user) {
      const socket = createSocket('agent');

      const watchId = navigator.geolocation.watchPosition((position) => {
        socket.emit('updateLocation', {
          id: user?._id,
          name: user.displayName,
          vehicleType: user?.vehicleType,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });

      return () => {
        navigator.geolocation.clearWatch(watchId);
        socket.disconnect();
      };
    }
  }, [user]);
  return (
    <>
      <AgentOverviewStats />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewStatsPage;
