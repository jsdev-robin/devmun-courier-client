'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../ui/card';
import GetLocation from '../../../../../features/GetLocation';

const AgentDeliveryRoute = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Route</CardTitle>
      </CardHeader>
      <CardContent>
        <GetLocation />
      </CardContent>
    </Card>
  );
};

export default AgentDeliveryRoute;
