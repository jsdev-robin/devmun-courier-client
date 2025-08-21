'use client';

import React from 'react';
import Loading from '../loading';
import { userAuthApi } from '../../lib/features/services/auth/authApi';

const Loader = ({ children }: { children: React.ReactNode }) => {
  const profile = userAuthApi.endpoints.getProfile.useQuery();

  if (profile.isError) {
    window.location.href = '/sign-in';
    return null;
  }

  return profile.isLoading ? <Loading /> : children;
};

export default Loader;
