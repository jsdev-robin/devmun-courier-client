'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import { useGetParcelByCustomerQuery } from '../../../../../lib/features/services/customerControl/customerControllApi';
import GetLiveTrackingMap from '../../../../features/GetLiveTrackingMap';

const CustomerOverviewAgentTracking = () => {
  const { data } = useGetParcelByCustomerQuery({
    queryParams: 'status[eq]=delivered',
  });

  const agentIds = data?.data.data.map((parcel) => parcel.agent._id) || [];

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Agent Tracking</CardTitle>
            <CardDescription>
              View all online agent locations worldwide with interactive pulsing
              markers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetLiveTrackingMap
              id={agentIds.join(',')}
              status="Online"
              name="All Agents"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerOverviewAgentTracking;
