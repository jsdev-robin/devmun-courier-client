'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '../../../../../lib/utils';
import { Button, buttonVariants } from '../../../../ui/button';
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle,
  Mail,
  MessageCircle,
  Package2,
  Phone,
  QrCode,
  Truck,
  XCircle,
} from 'lucide-react';
import Heading from '../../../../ui/heading';
import { Badge } from '../../../../ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import Typography from '../../../../ui/typography';
import { Scanner } from '@yudiel/react-qr-scanner';

const AgentParcelDetails = () => {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState('');

  return (
    <section>
      <div className="space-y-4">
        <Link
          href="/dashboard/agent/overview"
          className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
        >
          <ArrowLeft />
          Back to Parcel List
        </Link>
        <div className="flex items-center gap-4">
          <Package2 className="stroke-primary" />
          <Heading as="h6" className="text-primary">
            Parcel Details: TRK783429
          </Heading>
          <Badge>Pending Pickup</Badge>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6 items-center justify-between relative before:content-[''] before:absolute before:h-1 before:bg-muted before:z-10 before:mb-5 md:flex-row md:before:left-0 md:before:right-0">
                    {[
                      { label: 'Order Placed', icon: <Check /> },
                      { label: 'Dispatched', icon: <Check /> },
                      {
                        label: 'In Transit',
                        icon: <i className="fas fa-warehouse" />,
                      },
                      { label: 'Out for Delivery', icon: <Truck /> },
                      { label: 'Delivered', icon: <Check /> },
                    ].map((step, i) => (
                      <div
                        key={i}
                        className="z-20 text-center relative flex flex-col justify-center items-center"
                      >
                        <div
                          className={cn(
                            'size-9 rounded-full border-4 border-muted flex items-center justify-center bg-background',
                            i === 0 && 'bg-green-500 border-green-500',
                            i === 1 && 'bg-green-500 border-green-500',
                          )}
                        >
                          {step.icon}
                        </div>
                        <div className="text-xs">{step.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Parcel Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2">
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Tracking Number
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          TRK783429
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Parcel Type
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          Medium Box
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Weight
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          3.5 kg
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Dimensions
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          30 × 20 × 15 cm
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Fragile Content
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          No
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Insurance
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          Not Insured
                        </Heading>
                      </div>
                    </article>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sender & Receiver Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2">
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Sender Name
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          Amazon Logistics
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Sender Phone
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          (800) 555-1234
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Sender Address
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          123 Warehouse Ave, Logistics City
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Receiver Name
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          Sarah Johnson
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Receiver Phone
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          (555) 123-4567
                        </Heading>
                      </div>
                    </article>
                    <article className="bg-muted rounded-xl p-4">
                      <div className="space-y-2">
                        <Typography variant="xs" textColor="muted">
                          Receiver Address
                        </Typography>
                        <Heading
                          as="h6"
                          className="text-base font-semibold"
                          asChild
                        >
                          123 Main St, Apt 4B, New York, NY 10001
                        </Heading>
                      </div>
                    </article>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography>
                    <strong>Special Instructions:</strong> Call upon arrival. If
                    no response, leave with building superintendent.
                  </Typography>
                  <Typography>
                    <strong>Delivery Hours:</strong> 9:00 AM - 5:00 PM (Weekdays
                    only)
                  </Typography>
                  <Typography>
                    <strong>Security Access:</strong> Code #4521 for main
                    entrance
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delivery History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-s-3 border-primary">
                    {[
                      {
                        date: 'May 12, 2023 - 10:30 AM',
                        event: 'Parcel dispatched from sorting facility',
                      },
                      {
                        date: 'May 11, 2023 - 2:15 PM',
                        event: 'Order processed and labeled',
                      },
                      {
                        date: 'May 10, 2023 - 5:40 PM',
                        event: 'Order placed by customer',
                      },
                    ].map((step, index) => (
                      <li key={index} className="mb-6 ms-6 space-y-2">
                        <span className="absolute flex items-center justify-center size-5 bg-primary rounded-full -start-2.5 ring-2 ring-background">
                          <Check size={14} className="stroke-background" />
                        </span>
                        <Typography
                          className="font-poppins text-muted-foreground"
                          variant="sm"
                        >
                          {step.date}
                        </Typography>
                        <Typography className="font-roboto">
                          {step.event}
                        </Typography>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary h-50 w-full rounded-xl"></div>
                </CardContent>
                <CardFooter>
                  <div>
                    <Typography>
                      <strong>Distance from current location:</strong> 4.2 km
                    </Typography>
                    <Typography>
                      <strong>Estimated travel time:</strong> 15 minutes
                    </Typography>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Parcel Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Button className="bg-green-500 hover:bg-green-600">
                      <CheckCircle />
                      Mark as Picked Up
                    </Button>
                    <Button className="bg-sky-500 hover:bg-sky-600">
                      <Truck />
                      Start Delivery
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <AlertTriangle />
                      Report Issue
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600">
                      <XCircle />
                      Cancel Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Button>
                      <Phone />
                      Call Customer
                    </Button>
                    <Button>
                      <MessageCircle />
                      Call Customer
                    </Button>
                    <Button>
                      <Mail />
                      Email Customer
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Parcel QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {open ? (
                      <Scanner
                        onScan={(results) => {
                          if (results.length > 0) {
                            setScanResult(results[0].rawValue);
                          }
                        }}
                        onError={(err) => console.error('Scan error:', err)}
                        formats={['qr_code']}
                        scanDelay={300}
                      />
                    ) : (
                      <div className="size-60 mx-auto rounded-xl bg-muted flex items-center justify-center">
                        <QrCode className="size-20" />
                      </div>
                    )}
                    {scanResult && (
                      <div className="mt-4 p-2 border rounded bg-muted">
                        <p className="font-semibold">Scanned Result:</p>
                        <p>{scanResult}</p>
                      </div>
                    )}
                    <Typography variant="xs" className="text-center">
                      Scan QR code to verify pickup or delivery
                    </Typography>
                    <div className="flex items-center justify-center">
                      <Button onClick={() => setOpen((prev) => !prev)}>
                        <Camera />
                        {open ? 'Close Scanner' : 'Open Scanner'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentParcelDetails;
