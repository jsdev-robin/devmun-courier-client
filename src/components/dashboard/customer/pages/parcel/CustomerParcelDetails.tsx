'use client';

import React from 'react';
import { Button, buttonVariants } from '../../../../ui/button';
import {
  Check,
  Mail,
  MapPin,
  PackageOpen,
  Phone,
  Printer,
  ScrollText,
  Truck,
  TruckElectric,
} from 'lucide-react';
import Heading from '../../../../ui/heading';
import Typography from '../../../../ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import { Progress } from '../../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetCustomerParcelByIdQuery } from '../../../../../lib/features/services/parcel/parcelApi';
import Link from 'next/link';
import { cn } from '../../../../../lib/utils';
import Loading from '../../../../../app/loading';
import GetLiveTrackingMap from '../../../../features/GetLiveTrackingMap';

const CustomerParcelDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCustomerParcelByIdQuery(id);

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h5">Parcel Details</Heading>
              <Typography variant="sm" textColor="muted">
                {data?.parcel.trackingId}
              </Typography>
            </div>
            <Button>
              <Printer /> Print Details
            </Button>
          </div>
          <Card>
            <CardHeader>
              <Heading as="h6">
                Parcel Status:{' '}
                <span className="text-yellow-600">In Transit</span>
              </Heading>
              <Typography variant="sm" className="text-muted-foreground">
                Estimated delivery: October 18, 2023
              </Typography>
            </CardHeader>
            <CardContent>
              <Progress value={80} className="h-3" />
              <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                <span>Order Placed</span>
                <span>Picked Up</span>
                <span>In Transit</span>
                <span>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sender Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <Heading as="h6">
                          {data?.parcel.customer.displayName}
                        </Heading>
                        <Typography variant="sm">Customer</Typography>
                        <div className="mt-2 space-y-1.5">
                          <p className="text-sm text-muted-foreground flex gap-1.5">
                            <span>
                              <MapPin className="size-4" />
                            </span>
                            <span>
                              {data?.parcel.customer.address?.addressLine1}
                              {', '}
                              {data?.parcel.customer.address?.city}-
                              {data?.parcel.customer.address?.zipCode}
                              {', '}
                              {data?.parcel.customer.address?.stateDivision}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Phone className="size-4" />
                            {data?.parcel.customer.phone}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Mail className="size-4" />
                            {data?.parcel.customer.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Receiver Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <Heading as="h6">{data?.parcel.receiverName}</Heading>
                        <Typography variant="sm">Receiver </Typography>
                        <div className="mt-2 space-y-1.5">
                          <p className="text-sm text-muted-foreground flex gap-1.5">
                            <span>
                              <MapPin className="size-4" />
                            </span>
                            <span>{data?.parcel.deliveryAddress}</span>
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Phone className="size-4" />
                            {data?.parcel.receiverPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Parcel Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Parcel Type
                        </dt>
                        <dd className="mt-1 text-sm">
                          {data?.parcel.parcelType}
                        </dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Dimensions
                        </dt>
                        <dd className="mt-1 text-sm">
                          {data?.parcel.parcelSize}
                        </dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Payment
                        </dt>
                        <dd className="mt-1 text-sm">
                          {data?.parcel.paymentMethod}
                        </dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          COD Amount
                        </dt>
                        <dd className="mt-1 text-sm">
                          ৳ {data?.parcel.codAmount}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <GetLiveTrackingMap id={data?.parcel.agent._id} />
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Agent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <Typography variant="sm" weight="medium">
                            {data?.parcel.agent.displayName}
                          </Typography>
                          <Typography variant="sm" textColor="muted">
                            Delivery Agent #{data?.parcel.agent._id.slice(0, 5)}
                          </Typography>
                          <div className="mt-4 space-y-1.5">
                            <p className="text-sm flex items-center gap-1.5">
                              <Phone className="mr-2 size-4" />
                              {data?.parcel.agent.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`tel:${data?.parcel.agent.phone}`}
                        className={cn(buttonVariants({}), 'w-full')}
                      >
                        <Phone /> Call Delivery Agent
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="status-timeline">
                      <li className="relative pb-4">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                              <Check className="size-3.5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-700">
                                Parcel has been delivered successfully
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2023-10-15">
                                Oct 15, 10:30 AM
                              </time>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="relative pb-4">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center ring-8 ring-white">
                              <Truck className="size-3.5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-700">
                                Out for delivery
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2023-10-15">Oct 15, 9:15 AM</time>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="relative pb-4">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center ring-8 ring-white">
                              <TruckElectric className="size-3.5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-700">
                                In transit to destination city
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2023-10-14">Oct 14, 2:30 PM</time>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="relative pb-4">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center ring-8 ring-white">
                              <PackageOpen className="size-3.5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-700">
                                Parcel picked up from sender
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2023-10-14">
                                Oct 14, 10:45 AM
                              </time>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="relative">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center ring-8 ring-white">
                              <ScrollText className="size-3.5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-700">
                                Order created and payment confirmed
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2023-10-13">Oct 13, 4:20 PM</time>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerParcelDetails;
