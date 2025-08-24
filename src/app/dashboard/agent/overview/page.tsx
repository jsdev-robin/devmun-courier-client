import React from 'react';
import AgentOverviewStats from '../../../../components/dashboard/agent/pages/overview/AgentOverviewStats';
import AgentAssignedParcels from '../../../../components/dashboard/agent/pages/overview/AgentAssignedParcels';

const AgentOverviewStatsPage = () => {
  return (
    <>
      <AgentOverviewStats />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewStatsPage;
