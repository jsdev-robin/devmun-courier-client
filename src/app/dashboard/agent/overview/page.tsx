import React from 'react';
import AgentOverviewHeader from '../../../../components/dashboard/agent/pages/overview/AgentOverviewHeader';
import AgentOverviewStats from '../../../../components/dashboard/agent/pages/overview/AgentOverviewStats';
import AgentAssignedParcels from '../../../../components/dashboard/agent/pages/overview/AgentAssignedParcels';

const AgentOverviewPage = () => {
  return (
    <>
      <AgentOverviewHeader />
      <AgentOverviewStats />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewPage;
