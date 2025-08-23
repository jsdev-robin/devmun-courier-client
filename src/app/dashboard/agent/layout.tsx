import React from 'react';
import AgentDashboardHeader from '../../../components/dashboard/agent/layouts/AgentDashboardHeader';

const AgentDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AgentDashboardHeader />
      <main className="py-6 space-y-8">{children}</main>
    </>
  );
};

export default AgentDashboardLayout;
