'use client';

import React from 'react';
import AgentCreate from '@/components/pages/agent/AgentCreate';
import { useParams } from 'next/navigation';

const AgentCreatePage = () => {
  const params = useParams<{ token: string }>();
  return (
    <>
      <AgentCreate token={params.token} />
    </>
  );
};

export default AgentCreatePage;
