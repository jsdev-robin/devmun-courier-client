'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Button, buttonVariants } from '../../../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../../../../../ui/badge';
import { Parcel } from '../../../../../../lib/features/types/parcel';
import { formatDuration } from '../../../../../../utils/formatDuration';
import Link from 'next/link';
import { cn } from '../../../../../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useParcelStatusUpdateByAgentMutation } from '../../../../../../lib/features/services/agentControl/agentControllApi';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../ui/form';
import SelectInput from '../../../../../ui/SelectInput';
import { Input } from '../../../../../ui/input';
import { Textarea } from '../../../../../ui/textarea';

const parcelUpdateSchema = z.object({
  parcelId: z.string().min(1, 'Parcel selection is required'),
  status: z.string().min(1, 'Status name is required'),
  notes: z.string().max(500).optional(),
});

interface ParcelCardProps {
  item: Parcel;
}

const AgentParcelCard: React.FC<ParcelCardProps> = ({ item }) => {
  const { distance, duration, loading } = useMapboxDistance([
    item?.pickupLocation?.lng,
    item?.pickupLocation?.lat,
  ]);

  const [parcelStatusUpdateByAgent, { isLoading }] =
    useParcelStatusUpdateByAgentMutation();
  const form = useForm<z.infer<typeof parcelUpdateSchema>>({
    resolver: zodResolver(parcelUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      parcelId: item._id ?? '',
      status: '',
      notes: '',
    },
  });

  async function onSubmit(data: z.infer<typeof parcelUpdateSchema>) {
    await toast.promise(
      parcelStatusUpdateByAgent(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Updating status...',
        success: (res) => {
          form.reset();
          return res?.message;
        },
        error: (err) => err?.data?.message,
      },
    );
  }

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
        <Link
          href={`/dashboard/agent/navigation/${item._id}`}
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
        >
          <MapPin />
          View on Map
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Edit />
              Update Status
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Parcel Status</DialogTitle>
              <DialogDescription>
                Select a new status and add optional notes for this parcel.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="parcelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Parcel</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Update Status</FormLabel>
                        <FormControl>
                          <SelectInput
                            {...field}
                            options={[
                              { value: 'picked_up', label: 'Picked up' },
                              { value: 'in_transit', label: 'In Transit' },
                              { value: 'delivered', label: 'Delivered' },
                              {
                                value: 'failed',
                                label: 'Failed Delivery',
                              },
                            ]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" disabled={isLoading}>
                    {isLoading && <Loader className="animate-spin" />}
                    Update Status
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AgentParcelCard;
