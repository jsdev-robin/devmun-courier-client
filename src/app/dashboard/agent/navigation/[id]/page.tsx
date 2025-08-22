'use client';

import React from 'react';
import AgentNavigation from '../../../../../components/dashboard/agent/pages/navigation/AgentNavigation';
import { useMapboxDistance } from '../../../../../hooks/useMapboxDistance';

const AgentNavigationPage = () => {
  const { distance, duration, error, loading } = useMapboxDistance([
    90.4296, 23.7806,
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <p>Distance: {(distance! / 1000).toFixed(2)} km</p>
        <p>Duration: {(duration! / 60).toFixed(2)} minutes</p>
      </div>
      <AgentNavigation />
    </>
  );
};

export default AgentNavigationPage;
