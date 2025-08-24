'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import GetLiveTrackingMap from '../../../../features/GetLiveTrackingMap';

const CustomerOverviewAgentTracking = () => {
  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Agent Tracking</CardTitle>
            <CardDescription>
              View live agent locations worldwide with interactive pulsing
              markers. Hover over markers to see agent info.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetLiveTrackingMap id="" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerOverviewAgentTracking;
