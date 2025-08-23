import React from 'react';
import AgentOverviewHeader from '../../../../components/dashboard/agent/pages/overview/AgentOverviewHeader';
import AgentAssignedParcels from '../../../../components/dashboard/agents/pages/overview/AgentAssignedParcels';

const AgentOverviewPage = () => {
  return (
    <>
      <AgentOverviewHeader />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewPage;
