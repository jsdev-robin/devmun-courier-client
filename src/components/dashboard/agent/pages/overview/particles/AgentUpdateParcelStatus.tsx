'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../ui/form';
import SelectInput from '../../../../../ui/SelectInput';
import { Textarea } from '../../../../../ui/textarea';
import { Button } from '../../../../../ui/button';
import {
  useGetParcelByAgentQuery,
  useParcelStatusUpdateByAgentMutation,
} from '../../../../../../lib/features/services/agentControl/agentControllApi';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const parcelUpdateSchema = z.object({
  parcelId: z.string().min(1, 'Parcel selection is required'),
  status: z.string().min(1, 'Status name is required'),
  notes: z.string().max(500).optional(),
});

const AgentUpdateParcelStatus = () => {
  const [parcelStatusUpdateByAgent, { isLoading: updateStatusLoading }] =
    useParcelStatusUpdateByAgentMutation();
  const form = useForm<z.infer<typeof parcelUpdateSchema>>({
    resolver: zodResolver(parcelUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      parcelId: '',
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

  const { data, isLoading } = useGetParcelByAgentQuery({
    queryParams: 'status[ne]=delivered',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Parcel Status</CardTitle>
      </CardHeader>
      <CardContent>
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
                      <SelectInput
                        {...field}
                        options={
                          data?.data.data.map((parcel) => ({
                            label: parcel.trackingId,
                            value: parcel._id,
                          })) || []
                        }
                        disabled={isLoading || data?.data.data.length === 0}
                      />
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
              <Button
                className="w-full"
                disabled={
                  isLoading ||
                  updateStatusLoading ||
                  data?.data.data.length === 0
                }
              >
                {isLoading && <Loader className="animate-spin" />}
                Update Status
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AgentUpdateParcelStatus;
