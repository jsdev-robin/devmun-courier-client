'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Heading from '../../ui/heading';
import { Card } from '../../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import GetLocation from '../../features/GetLocation';
import SelectInput from '../../ui/SelectInput';
import { Button } from '../../ui/button';
import { useCustomerBookParcelMutation } from '../../../lib/features/services/parcel/parcelApi';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import useUser from '../../../guard/useUser';
import { Label } from '../../ui/label';

const parcelBookingSchema = z.object({
  receiverName: z.string().min(1, { message: 'Receiver name is required' }),
  receiverPhone: z.string().min(1, { message: 'Receiver contact is required' }),
  pickupAddress: z.string().min(1, { message: 'Pickup address is required' }),
  deliveryAddress: z
    .string()
    .min(1, { message: 'Delivery address is required' }),
  parcelType: z.string().min(1, { message: 'Parcel type is required' }),
  parcelSize: z.string().min(1, { message: 'Parcel size is required' }),
  paymentMethod: z.string().min(1, { message: 'Payment method is required' }),
  codAmount: z.string().min(1, { message: 'COD amount is required' }),
  pickupLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

const CustomerBookParcel = () => {
  const [customerBookParcel, { isLoading }] = useCustomerBookParcelMutation();
  const user = useUser();

  const form = useForm<z.infer<typeof parcelBookingSchema>>({
    resolver: zodResolver(parcelBookingSchema),
    mode: 'onChange',
    defaultValues: {
      receiverName: '',
      receiverPhone: '',
      pickupAddress: '',
      deliveryAddress: '',
      parcelType: '',
      parcelSize: '',
      paymentMethod: '',
      codAmount: '',
    },
  });

  async function onSubmit(data: z.infer<typeof parcelBookingSchema>) {
    await toast.promise(
      customerBookParcel(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Booking a parcel...',
        success: (res) => res?.message,
        error: (err) => err?.data?.message,
      },
    );
  }

  return (
    <section>
      <div className="container">
        <div className="space-y-10">
          <Heading
            as="h4"
            className="section-title text-center relative pb-2.5"
          >
            Book a Parcel Pickup
          </Heading>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">
                  <div className="xl:col-span-3">
                    <Card className="p-6">
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                        <div className="grid gap-2">
                          <Label>Sender Name</Label>
                          <Input value={user?.displayName} readOnly />
                        </div>
                        <div className="grid gap-2">
                          <Label>Sender Contact</Label>
                          <Input value={'Manikganj-1800'} readOnly />
                        </div>
                        <FormField
                          control={form.control}
                          name="receiverName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Receiver Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="receiverPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Receiver Contact</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pickupAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="deliveryAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Delivery Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="parcelType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parcel Type</FormLabel>
                              <FormControl>
                                <SelectInput
                                  {...field}
                                  options={[
                                    { value: 'document', label: 'Document' },
                                    { value: 'package', label: 'Package' },
                                    { value: 'fragile', label: 'Fragile Item' },
                                    {
                                      value: 'electronics',
                                      label: 'Electronics',
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
                          name="parcelSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parcel Size</FormLabel>
                              <FormControl>
                                <SelectInput
                                  {...field}
                                  options={[
                                    {
                                      value: 'small',
                                      label: 'Small (up to 1kg)',
                                    },
                                    {
                                      value: 'medium',
                                      label: 'Medium (1kg - 5kg)',
                                    },
                                    {
                                      value: 'large',
                                      label: 'Large (5kg - 10kg)',
                                    },
                                    {
                                      value: 'xlarge',
                                      label: 'Extra Large (10kg+)',
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
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                <SelectInput
                                  {...field}
                                  options={[
                                    { value: 'prepaid', label: 'Prepaid' },
                                    { value: 'cod', label: 'Cash on Delivery' },
                                  ]}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="codAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>COD Amount (if applicable)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  </div>
                  <div className="xl:col-span-2 h-full">
                    <GetLocation
                      onChange={(value) => {
                        form.setValue('pickupLocation', {
                          lat: value?.lat,
                          lng: value?.lng,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button disabled={isLoading}>
                    {isLoading && <Loader className="animate-spin" />}Schedule
                    Pickup
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CustomerBookParcel;
