import React from 'react';
import AgentParcelStats from '@/components/dashboard/agent/pages/overview/AgentParcelStats';
import AgentAssignedParcels from '@/components/dashboard/agent/pages/overview/AgentAssignedParcels';

const page = () => {
  return (
    <>
      <AgentParcelStats />
      <AgentAssignedParcels />
    </>
  );
};

export default page;
