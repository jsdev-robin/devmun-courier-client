'use client';

import React from 'react';
import AgentNavigation from '../../../../../components/ui/dashboard/agent/pages/navigation/AgentNavigation';
import { useParams } from 'next/navigation';

const AgentNavigationPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <>
      <AgentNavigation id={params.id} />
    </>
  );
};

export default AgentNavigationPage;
