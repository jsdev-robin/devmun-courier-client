'use client';

import React from 'react';
import Loader from './loader';

const LayoutMainHub = ({ children }: { children: React.ReactNode }) => {
  return <Loader>{children}</Loader>;
};

export default LayoutMainHub;
