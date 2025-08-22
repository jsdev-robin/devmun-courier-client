import React from 'react';
import Heading from '../../../../ui/heading';
import { Button } from '../../../../ui/button';
import {
  AlertCircle,
  Banknote,
  Edit,
  Filter,
  MapPin,
  Package,
  SortAsc,
  Truck,
} from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../../../../ui/badge';
import AgentDeliveryRoute from './particles/AgentDeliveryRoute';
import AgentUpdateParcelStatus from './particles/AgentUpdateParcelStatus';

const AgentAssignedParcels = () => {
  return (
    <section>
      <div className="container">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h6">Assigned Parcels</Heading>
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline">
                    <Filter />
                    Filter
                  </Button>
                  <Button size="sm">
                    <SortAsc />
                    Sort
                  </Button>
                </div>
              </div>
              <Card className="border-l-4 gap-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>#TRK789012 - Sarah Johnson</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      <span>456 Oak Avenue, Chittagong - 12.5 km away</span>
                    </div>
                  </CardDescription>
                  <CardAction className="flex items-center gap-2">
                    <Badge>
                      <AlertCircle />
                      Priority
                    </Badge>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Badge className="rounded-full py-1.5 bg-yellow-500/25 text-yellow-800">
                      <Truck />
                      In Transit
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-blue-500/25 text-blue-800">
                      <Banknote />
                      COD: ৳ 1,250
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-violet-500/25 text-violet-800">
                      <Package />
                      Medium Package
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="w-full grid grid-cols-2 gap-3">
                  <Button className="w-full" variant="outline">
                    <MapPin />
                    View on Map
                  </Button>
                  <Button className="w-full">
                    <Edit />
                    Update Status
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-l-4 gap-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>#TRK789012 - Sarah Johnson</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      <span>456 Oak Avenue, Chittagong - 12.5 km away</span>
                    </div>
                  </CardDescription>
                  <CardAction className="flex items-center gap-2">
                    <Badge>
                      <AlertCircle />
                      Priority
                    </Badge>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Badge className="rounded-full py-1.5 bg-yellow-500/25 text-yellow-800">
                      <Truck />
                      In Transit
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-blue-500/25 text-blue-800">
                      <Banknote />
                      COD: ৳ 1,250
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-violet-500/25 text-violet-800">
                      <Package />
                      Medium Package
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="w-full grid grid-cols-2 gap-3">
                  <Button className="w-full" variant="outline">
                    <MapPin />
                    View on Map
                  </Button>
                  <Button className="w-full">
                    <Edit />
                    Update Status
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-l-4 gap-4 border-l-green-600">
                <CardHeader>
                  <CardTitle>#TRK789012 - Sarah Johnson</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      <span>456 Oak Avenue, Chittagong - 12.5 km away</span>
                    </div>
                  </CardDescription>
                  <CardAction className="flex items-center gap-2">
                    <Badge>
                      <AlertCircle />
                      Priority
                    </Badge>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Badge className="rounded-full py-1.5 bg-yellow-500/25 text-yellow-800">
                      <Truck />
                      In Transit
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-blue-500/25 text-blue-800">
                      <Banknote />
                      COD: ৳ 1,250
                    </Badge>
                    <Badge className="rounded-full py-1.5 bg-violet-500/25 text-violet-800">
                      <Package />
                      Medium Package
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="w-full grid grid-cols-2 gap-3">
                  <Button className="w-full" variant="outline">
                    <MapPin />
                    View on Map
                  </Button>
                  <Button className="w-full">
                    <Edit />
                    Update Status
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <AgentDeliveryRoute />
              <AgentUpdateParcelStatus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentAssignedParcels;
