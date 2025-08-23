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
import {
  useGetAgentByAdminQuery,
  useGetParcelByAdminQuery,
  useParcelAssginByAdminMutation,
} from '../../../../../lib/features/services/adminControl/adminControllApi';
import { cn } from '../../../../../lib/utils';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const parcelUpdateSchema = z.object({
  parcelId: z.string(),
  agentId: z.string().min(1, 'Customer name is required'),
  priority: z.string().min(1, 'Priority name is required'),
  notes: z.string().max(500).optional(),
});

const AdminAvailableAgent = () => {
  const [parcelAssginByAdmin, { isLoading }] = useParcelAssginByAdminMutation();
  const form = useForm<z.infer<typeof parcelUpdateSchema>>({
    resolver: zodResolver(parcelUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      parcelId: '',
      agentId: '',
      priority: 'medium',
      notes: '',
    },
  });

  async function onSubmit(data: z.infer<typeof parcelUpdateSchema>) {
    await toast.promise(
      parcelAssginByAdmin(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Assgining parcel...',
        success: (res) => {
          form.reset();
          return res?.message;
        },
        error: (err) => err?.data?.message,
      },
    );
  }

  const { data: agentData, isLoading: agentLoading } = useGetAgentByAdminQuery({
    queryParams: 'fields=familyName givenName avatar',
  });

  const { data: parcelData, isLoading: parcelLoading } =
    useGetParcelByAdminQuery({
      queryParams: 'fields=trackingId&status=booked',
    });

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
                  {agentData?.data.data.map((item, i) => (
                    <Card
                      className={cn(
                        'p-0 gap-0',
                        form.watch('agentId') === item._id && 'border-blue-500',
                      )}
                      key={i}
                    >
                      <CardHeader className="pb-0 p-6 gap-0 ">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage
                              src={item.avatar?.url}
                              alt={item.familyName}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {item.familyName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <CardTitle>Robin</CardTitle>
                            <CardDescription>
                              3 parcels assigned
                            </CardDescription>
                          </div>
                        </div>
                        <CardAction>
                          <Button
                            onClick={() => {
                              form.setValue('agentId', item._id);
                            }}
                          >
                            Assgin
                          </Button>
                        </CardAction>
                      </CardHeader>
                    </Card>
                  ))}
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
                      name="agentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Agent</FormLabel>
                          <FormControl>
                            <SelectInput
                              {...field}
                              options={
                                agentData?.data.data.map((agent) => ({
                                  label: `${agent.familyName} ${agent.givenName}`,
                                  value: agent._id,
                                })) || []
                              }
                              disabled={agentLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                                parcelData?.data.data.map((parcel) => ({
                                  label: parcel.trackingId,
                                  value: parcel._id,
                                })) || []
                              }
                              disabled={parcelLoading}
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
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading && <Loader className="animate-spin" />}Update
                      Status
                    </Button>
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
