'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SelectInput from '@/components/ui/SelectInput';
import { Textarea } from '@/components/ui/textarea';
import AdminInviteAgent from './particles/AdminInviteAgent';

const parcelUpdateSchema = z.object({
  trackingNumber: z
    .string()
    .regex(/^#?TRK\d{6,}$/, 'Invalid tracking number format'),
  agent: z.string().min(1, 'Customer name is required'),
  priority: z.string().min(1, 'Priority name is required'),
  notes: z.string().max(500).optional(),
});

const AdminAvailableAgent = () => {
  const form = useForm<z.infer<typeof parcelUpdateSchema>>({
    resolver: zodResolver(parcelUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      trackingNumber: '',
      agent: '',
      priority: 'Pending',
      notes: '',
    },
  });

  async function onSubmit(data: z.infer<typeof parcelUpdateSchema>) {
    console.log(data);
  }

  return (
    <section>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Delivery Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2">
                  <Card className="p-0 gap-0">
                    <CardHeader className="pb-0 p-6 gap-0 ">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <CardTitle>Robin</CardTitle>
                          <CardDescription>3 parcels assigned</CardDescription>
                        </div>
                      </div>
                      <CardAction>
                        <Button>Assgin</Button>
                      </CardAction>
                    </CardHeader>
                  </Card>
                  <Card className="p-0 gap-0">
                    <CardHeader className="pb-0 p-6 gap-0 ">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <CardTitle>Robin</CardTitle>
                          <CardDescription>3 parcels assigned</CardDescription>
                        </div>
                      </div>
                      <CardAction>
                        <Button>Assgin</Button>
                      </CardAction>
                    </CardHeader>
                  </Card>
                  <Card className="p-0 gap-0">
                    <CardHeader className="pb-0 p-6 gap-0 ">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <CardTitle>Robin</CardTitle>
                          <CardDescription>3 parcels assigned</CardDescription>
                        </div>
                      </div>
                      <CardAction>
                        <Button>Assgin</Button>
                      </CardAction>
                    </CardHeader>
                  </Card>
                  <Card className="p-0 gap-0">
                    <CardHeader className="pb-0 p-6 gap-0 ">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <CardTitle>Robin</CardTitle>
                          <CardDescription>3 parcels assigned</CardDescription>
                        </div>
                      </div>
                      <CardAction>
                        <Button>Assgin</Button>
                      </CardAction>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <AdminInviteAgent />
          </div>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Assign Parcel to Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="agent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Agent</FormLabel>
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
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <SelectInput
                              {...field}
                              options={[
                                { value: 'urgent', label: 'Urgent' },
                                { value: 'high', label: 'High' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'low', label: 'Low' },
                                { value: 'deferred', label: 'Deferred' },
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
        </div>
      </div>
    </section>
  );
};

export default AdminAvailableAgent;
