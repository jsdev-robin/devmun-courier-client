import React from 'react';
import AgentOverviewHeader from '../../../../components/ui/dashboard/agent/pages/overview/AgentOverviewHeader';
import AgentOverviewStats from '../../../../components/ui/dashboard/agent/pages/overview/AgentOverviewStats';
import AgentAssignedParcels from '../../../../components/ui/dashboard/agent/pages/overview/AgentAssignedParcels';

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
