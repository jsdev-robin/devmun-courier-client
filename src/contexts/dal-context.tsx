import React, { createContext, useContext, ReactNode } from 'react';

type DalContextType = {
  role: {
    agent: unknown;
    customer: unknown;
  };
};

const DalContext = createContext<DalContextType | undefined>(undefined);

type DalProps = {
  children: ReactNode;
  role: {
    agent: unknown;
    customer: unknown;
  };
};

export const DalProvider = ({ children, role }: DalProps) => {
  return <DalContext.Provider value={{ role }}>{children}</DalContext.Provider>;
};

export const useDal = (): DalContextType => {
  const context = useContext(DalContext);
  if (!context) {
    throw new Error('useDal must be used within an Dal Provider');
  }
  return context;
};
