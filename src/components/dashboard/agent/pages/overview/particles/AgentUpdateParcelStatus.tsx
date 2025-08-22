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

const parcelUpdateSchema = z.object({
  trackingNumber: z
    .string()
    .regex(/^#?TRK\d{6,}$/, 'Invalid tracking number format'),
  customerName: z.string().min(1, 'Customer name is required'),
  status: z.enum(['Failed Delivery', 'Delivered', 'In Transit', 'Pending']),
  notes: z.string().max(500).optional(),
});

const AgentUpdateParcelStatus = () => {
  const form = useForm<z.infer<typeof parcelUpdateSchema>>({
    resolver: zodResolver(parcelUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      trackingNumber: '',
      customerName: '',
      status: 'Pending',
      notes: '',
    },
  });

  async function onSubmit(data: z.infer<typeof parcelUpdateSchema>) {
    console.log(data);
  }

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
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Parcel</FormLabel>
                    <FormControl>
                      <SelectInput
                        {...field}
                        options={[
                          {
                            value: '#TRK789013',
                            label: '#TRK789013 - Robert Brown',
                          },
                          {
                            value: '#TRK456782',
                            label: '#TRK456782 - Alice Johnson',
                          },
                          {
                            value: '#TRK123457',
                            label: '#TRK123457 - Michael Smith',
                          },
                          {
                            value: '#TRK987654',
                            label: '#TRK987654 - Emma Williams',
                          },
                          {
                            value: '#TRK654321',
                            label: '#TRK654321 - David Miller',
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Status</FormLabel>
                    <FormControl>
                      <SelectInput
                        {...field}
                        options={[
                          { value: 'Pending', label: 'Pending' },
                          { value: 'In Transit', label: 'In Transit' },
                          { value: 'Delivered', label: 'Delivered' },
                          {
                            value: 'Failed Delivery',
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
              <Button className="w-full">Update Status</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AgentUpdateParcelStatus;
