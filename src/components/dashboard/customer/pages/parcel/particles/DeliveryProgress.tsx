'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '../../../../../../lib/utils';

interface DeliveryProgressProps {
  status:
    | 'booked'
    | 'picked_up'
    | 'in_transit'
    | 'delivered'
    | 'failed'
    | undefined;
}

export function DeliveryProgress({ status }: DeliveryProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    switch (status) {
      case 'booked':
        setProgress(0);
        break;
      case 'picked_up':
        setProgress(25);
        break;
      case 'in_transit':
        setProgress(50);
        break;
      case 'delivered':
        setProgress(75);
        break;
      case 'failed':
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  }, [status]);

  const getStatusText = () => {
    switch (status) {
      case 'booked':
        return 'Booked - Order confirmed';
      case 'picked_up':
        return 'Picked Up - Agent collected package';
      case 'in_transit':
        return 'In Transit - On the way to destination';
      case 'delivered':
        return 'Delivered - Package delivered successfully';
      case 'failed':
        return 'Failed - Delivery attempt failed';
      default:
        return 'Unknown Status';
    }
  };

  const getProgressColor = () => {
    if (status === 'failed')
      return '[&_[data-slot=progress-indicator]]:bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span
          className={cn(
            'text-sm font-medium',
            status === 'failed' && 'text-red-500',
          )}
        >
          {getStatusText()}
        </span>
        <span
          className={cn(
            'text-sm text-muted-foreground',
            status === 'failed' && 'text-red-500',
          )}
        >
          {status === 'failed' ? 'Fail' : `${progress}%`}
        </span>
      </div>
      <Progress value={progress} className={cn('w-full', getProgressColor())} />
    </div>
  );
}
