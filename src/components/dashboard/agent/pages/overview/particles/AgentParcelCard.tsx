'use client';

import React from 'react';
import { useMapboxDistance } from '../../../../../../hooks/useMapboxDistance';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../../ui/card';
import {
  AlertCircle,
  Banknote,
  Edit,
  MapPin,
  Package,
  Truck,
} from 'lucide-react';
import { Button } from '../../../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../../../../../ui/badge';
import { Parcel } from '../../../../../../lib/features/types/parcel';
import { formatDuration } from '../../../../../../utils/formatDuration';

interface ParcelCardProps {
  item: Parcel;
}

const AgentParcelCard: React.FC<ParcelCardProps> = ({ item }) => {
  const { distance, duration, loading } = useMapboxDistance([
    item?.pickupLocation?.lng,
    item?.pickupLocation?.lat,
  ]);

  return (
    <Card className="border-l-4 gap-4 border-l-green-600">
      <CardHeader>
        <CardTitle>
          #{item.trackingId} - {item.receiverName}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            <span>
              {item.pickupAddress},{' '}
              {loading
                ? 'Calculating...'
                : `${(distance! / 1000).toFixed(2)} km, ${formatDuration(
                    duration!,
                  )} away`}
            </span>
          </div>
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Badge>
            <AlertCircle />
            Priority
          </Badge>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Badge className="rounded-full py-1.5 bg-yellow-500/25 text-yellow-800 capitalize">
            <Truck />
            {item.status}
          </Badge>
          <Badge className="rounded-full py-1.5 bg-blue-500/25 text-blue-800 capitalize">
            <Banknote />
            {item.paymentMethod}: ৳ {item.codAmount}
          </Badge>
          <Badge className="rounded-full py-1.5 bg-violet-500/25 text-violet-800 capitalize">
            <Package />
            {item.parcelSize}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="w-full grid grid-cols-2 gap-3">
        <Button className="w-full" variant="outline">
          <MapPin />
          View on Map
        </Button>
        <Button className="w-full">
          <Edit />
          Update Status
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentParcelCard;
