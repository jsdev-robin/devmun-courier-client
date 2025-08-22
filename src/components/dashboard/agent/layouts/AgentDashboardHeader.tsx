import { TruckElectric } from 'lucide-react';
import React from 'react';

const AgentDashboardHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between gap-6 h-16">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center">
              <div className="gradient-bg p-2.5 rounded-lg">
                <TruckElectric className="text-background" />
              </div>
              <span className="ml-2 text-xl font-bold text-dark">
                ParcelTrack Agent
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AgentDashboardHeader;
