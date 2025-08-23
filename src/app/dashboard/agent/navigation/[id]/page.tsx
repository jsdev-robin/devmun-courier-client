'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import AgentNavigation from '../../../../../components/dashboard/agent/pages/navigation/AgentNavigation';

const AgentNavigationPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <>
      <AgentNavigation id={params.id} />
    </>
  );
};

export default AgentNavigationPage;
