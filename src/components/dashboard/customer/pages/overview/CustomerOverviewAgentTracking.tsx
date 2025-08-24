'use client';

import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import { useGetParcelByCustomerQuery } from '../../../../../lib/features/services/customerControl/customerControllApi';
import SelectInput from '../../../../ui/SelectInput';
import GetLiveTrackingMap from '../../../../features/GetLiveTrackingMap';

const CustomerOverviewAgentTracking = () => {
  const { data } = useGetParcelByCustomerQuery({
    queryParams: 'status[eq]=delivered',
  });

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
            <CardAction>
              <SelectInput
                options={
                  data?.data.data.map((parcel) => ({
                    label: parcel.trackingId,
                    value: parcel.agent._id,
                  })) || []
                }
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <GetLiveTrackingMap
              id="68aad2f3ca1430376046ec2f"
              status="Booked"
              name="Robin Mind"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerOverviewAgentTracking;
