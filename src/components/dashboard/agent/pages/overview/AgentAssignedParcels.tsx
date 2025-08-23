'use client';

import React from 'react';
import Heading from '../../../../ui/heading';
import { Button } from '../../../../ui/button';
import { Filter, SortAsc } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../../../ui/card';

import AgentDeliveryRoute from './particles/AgentDeliveryRoute';
import AgentUpdateParcelStatus from './particles/AgentUpdateParcelStatus';
import { useGetAgentParcelsQuery } from '../../../../../lib/features/services/parcel/parcelApi';
import { Skeleton } from '../../../../ui/skeleton';
import AgentParcelCard from './particles/AgentParcelCard';

const AgentAssignedParcels = () => {
  const { data, isLoading, isError } = useGetAgentParcelsQuery();

  return (
    <section>
      <div className="container">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h6">Assigned Parcels</Heading>
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline">
                    <Filter />
                    Filter
                  </Button>
                  <Button size="sm">
                    <SortAsc />
                    Sort
                  </Button>
                </div>
              </div>
              {isError ? (
                <div>dfd</div>
              ) : isLoading ? (
                [...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-40" />
                      <CardDescription>
                        <Skeleton className="h-3 w-56 mt-2" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-28" />
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-3">
                      <Skeleton className="h-9" />
                      <Skeleton className="h-9" />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                data?.data.map((item, i) => (
                  <AgentParcelCard key={i} item={item} />
                ))
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <AgentDeliveryRoute />
              <AgentUpdateParcelStatus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentAssignedParcels;
