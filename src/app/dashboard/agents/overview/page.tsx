import AgentParcelStats from '@/components/dashboard/agents/pages/overview/AgentParcelStats';
import AgentAssignedParcels from '@/components/dashboard/agents/pages/overview/AgentAssignedParcels';

const AgentOverviewPage = () => {
  return (
    <>
      <AgentParcelStats />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewPage;
