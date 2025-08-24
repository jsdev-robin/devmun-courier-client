'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GetLocation from '@/components/features/GetLocation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateAddressMutation } from '@/components/../lib/features/services/auth/authApi';
import useUser from '../../../../../guard/useUser';

const AddressSchema = z.object({
  addressLine1: z
    .string()
    .trim()
    .min(5, 'Address Line 1 must be at least 5 characters')
    .max(100, 'Address Line 1 must be at most 100 characters'),
  addressLine2: z
    .string()
    .trim()
    .max(100, 'Address Line 2 must be at most 100 characters')
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(60, 'City must be at most 60 characters'),
  stateDivision: z
    .string()
    .trim()
    .min(2, 'Division must be at least 2 characters')
    .max(50, 'Division must be at most 50 characters'),
  zipCode: z
    .string()
    .trim()
    .min(4, 'ZIP code must be at least 4 characters')
    .max(10, 'ZIP code must be at most 10 characters'),
  landmark: z
    .string()
    .trim()
    .max(100, 'Landmark must be at most 100 characters')
    .optional()
    .or(z.literal('')),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .refine((loc) => loc.lat !== 0 && loc.lng !== 0, {
      message: 'Location is required. Please select your location.',
    }),
});

const CustomerAddress = () => {
  const user = useUser();
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    mode: 'onChange',
    defaultValues: {
      addressLine1: user?.address?.addressLine1 ?? '',
      addressLine2: user?.address?.addressLine2 ?? '',
      city: user?.address?.city ?? '',
      stateDivision: user?.address?.stateDivision ?? '',
      zipCode: user?.address?.zipCode ?? '',
      landmark: user?.address?.landmark ?? '',
      location: {
        lat: user?.address.location.lat ?? 0,
        lng: user?.address.location.lng ?? 0,
      },
    },
  });

  async function onSubmit(data: z.infer<typeof AddressSchema>) {
    await toast.promise(
      updateAddress(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Updating your profile',
        success: (res) => {
          form.reset();
          return res?.message;
        },
        error: (err) => err?.data?.message,
      },
    );
  }

  useEffect(() => {
    if (location) {
      form.setValue('location', location);
    }
  }, [location, form]);

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/customer/overview">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Your Addresses</CardTitle>
                      <CardDescription>
                        Add and manage your delivery addresses for faster
                        checkout
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="addressLine1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 1</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Street address, P.O. box"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="addressLine2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2 (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Apartment, suite, etc."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="stateDivision"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Division</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter division"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter ZIP code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="landmark"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Landmark (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Nearby landmark"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader className="animate-spin" />}
                        Save Address
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="location"
                    render={() => (
                      <FormItem>
                        <GetLocation
                          className="h-100"
                          setPickupLocation={setLocation}
                          defaultLocation={user?.address?.location}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CustomerAddress;
