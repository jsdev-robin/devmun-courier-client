import React from 'react';
import { Button } from '../../../ui/button';
import {
  Check,
  Mail,
  MapPin,
  PackageOpen,
  Phone,
  Printer,
  ScrollText,
  Star,
  Truck,
  TruckElectric,
} from 'lucide-react';
import Heading from '../../../ui/heading';
import Typography from '../../../ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CustomerParcelDetails = () => {
  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h5">Parcel Details</Heading>
              <Typography variant="sm" textColor="muted">
                Tracking ID: #TRK789012
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
              <Progress value={65} className="h-3" />
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
                        <Heading as="h6">John Doe</Heading>
                        <Typography variant="sm">Customer</Typography>
                        <div className="mt-2 space-y-1.5">
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="size-4" />
                            123 Main Street, Dhaka 1212
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Phone className="size-4" />
                            +880 1712 345678
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Mail className="size-4" />
                            john.doe@example.com
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
                        <Heading as="h6">Sarah Johnson</Heading>
                        <Typography variant="sm">Receiver</Typography>
                        <div className="mt-2 space-y-1.5">
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="size-4" />
                            456 Oak Avenue, Chittagong 4000
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Phone className="size-4" />
                            +880 1812 345678
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
                        <dd className="mt-1 text-sm">Package</dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Dimensions
                        </dt>
                        <dd className="mt-1 text-sm">30cm x 20cm x 15cm</dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Weight
                        </dt>
                        <dd className="mt-1 text-sm">2.5 kg</dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Payment Method
                        </dt>
                        <dd className="mt-1 text-sm">Cash on Delivery</dd>
                      </div>
                      <div className="col-span-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                          COD Amount
                        </dt>
                        <dd className="mt-1 text-sm">৳ 1,250</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-100 bg-primary w-full"></div>
                  </CardContent>
                </Card>
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
                            Michael Chen
                          </Typography>
                          <Typography variant="sm" textColor="muted">
                            Delivery Agent #A789
                          </Typography>
                          <div className="mt-2 flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Online
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              Last updated: 12:45 PM
                            </span>
                          </div>
                          <div className="mt-4 space-y-1.5">
                            <p className="text-sm flex items-center gap-1.5">
                              <Phone className="mr-2 size-4" />
                              +880 1912 345678
                            </p>
                            <p className="text-sm flex items-center gap-1.5">
                              <Star className="mr-2 size-4" />
                              4.8/5 (126 deliveries)
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Phone /> Call Delivery Agent
                      </Button>
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
