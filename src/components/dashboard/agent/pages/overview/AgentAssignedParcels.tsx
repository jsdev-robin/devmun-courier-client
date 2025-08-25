'use client';

import React, { useState } from 'react';
import Heading from '../../../../ui/heading';
import { Button } from '../../../../ui/button';
import { QrCode } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../../../ui/card';

import { Skeleton } from '../../../../ui/skeleton';
import AgentParcelCard from './particles/AgentParcelCard';
import { useGetParcelByAgentQuery } from '../../../../../lib/features/services/agentControl/agentControllApi';
import AgentUpdateParcelStatus from './particles/AgentUpdateParcelStatus';
import AgentDeliveryRoute from '../route/AgentDeliveryRoute';
import { Scanner } from '@yudiel/react-qr-scanner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AgentAssignedParcels = () => {
  const [scanResult, setScanResult] = useState('');

  const { data, isLoading, isError } = useGetParcelByAgentQuery({
    queryParams: `status[nin]=delivered${
      scanResult && `&trackingId=${scanResult}`
    }`,
  });

  return (
    <section>
      <div className="container">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h6">Assigned Parcels</Heading>
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <QrCode />
                        Scan QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Parcel QR Scanner</DialogTitle>
                        <DialogDescription>
                          Scan parcel QR codes instantly to view details.
                        </DialogDescription>
                      </DialogHeader>
                      <Scanner
                        onScan={(results) => {
                          if (results.length > 0) {
                            setScanResult(results[0].rawValue);
                          }
                        }}
                      />
                    </DialogContent>
                  </Dialog>
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
                data?.data.data.map((item, i) => (
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
