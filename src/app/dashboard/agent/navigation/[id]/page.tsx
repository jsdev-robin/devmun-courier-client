'use client';

import React from 'react';
import AgentNavigation from '../../../../../components/dashboard/agent/pages/navigation/AgentNavigation';
import useUser from '../../../../../guard/useUser';

const AgentNavigationPage = () => {
  const user = useUser();

  return (
    <div>
      <AgentNavigation id={user?._id} />
    </div>
  );
};

export default AgentNavigationPage;
