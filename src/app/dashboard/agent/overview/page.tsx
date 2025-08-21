import AgentParcelStats from '@/components/dashboard/agent/pages/overview/AgentParcelStats';
import AgentAssignedParcels from '@/components/dashboard/agent/pages/overview/AgentAssignedParcels';

const AgentOverviewPage = () => {
  return (
    <>
      <AgentParcelStats />
      <AgentAssignedParcels />
    </>
  );
};

export default AgentOverviewPage;
