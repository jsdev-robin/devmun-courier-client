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
} from '../../../../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/form';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import GetLocation from '../../../../features/GetLocation';

const AddressSchema = z.object({
  // firstName: z
  //   .string()
  //   .trim()
  //   .min(2, 'First name must be at least 2 characters')
  //   .max(50, 'First name must be at most 50 characters'),
  // lastName: z
  //   .string()
  //   .trim()
  //   .min(2, 'Last name must be at least 2 characters')
  //   .max(50, 'Last name must be at most 50 characters'),
  // phoneNumber: z
  //   .string()
  //   .trim()
  //   .min(6, 'Phone number must be at least 6 characters')
  //   .max(20, 'Phone number must be at most 20 characters'),
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
    .optional(),
});

const CustomerAddress = () => {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    mode: 'onChange',
    defaultValues: {
      // firstName: '',
      // lastName: '',
      // phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateDivision: '',
      zipCode: '',
      landmark: '',
    },
  });

  async function onSubmit(data: z.infer<typeof AddressSchema>) {
    console.log(data);
  }

  useEffect(() => {
    if (location) {
      form.setValue('location', location);
    }
  }, [location, form]);

  return (
    <section>
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Your Addresses</CardTitle>
                    <CardDescription>
                      Add and manage your delivery addresses for faster checkout
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
                              <Input {...field} placeholder="Enter division" />
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
                              <Input {...field} placeholder="Enter ZIP code" />
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
                              <Input {...field} placeholder="Nearby landmark" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">Save Address</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <GetLocation
                  className="h-100"
                  setPickupLocation={setLocation}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CustomerAddress;
