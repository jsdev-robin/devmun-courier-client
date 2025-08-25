'use client';

import { useParcelStatusDistributionQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';
import { Card, CardAction, CardHeader, CardTitle } from '../../../../ui/card';
import Heading from '../../../../ui/heading';
import {
  AlertTriangle,
  CircleCheck,
  Clock,
  Package2,
  ShoppingCart,
} from 'lucide-react';
import { Skeleton } from '../../../../ui/skeleton';

const statusConfig: Record<
  string,
  { title: string; icon: React.ReactNode; bg: string }
> = {
  in_transit: {
    title: 'Parcels In Transit',
    icon: <Package2 className="stroke-sky-500 size-7" />,
    bg: 'bg-sky-500/25',
  },
  booked: {
    title: 'Booked Parcels',
    icon: <ShoppingCart className="stroke-blue-500 size-7" />,
    bg: 'bg-blue-500/25',
  },
  delivered: {
    title: "Today's Deliveries",
    icon: <CircleCheck className="stroke-green-500 size-7" />,
    bg: 'bg-green-500/25',
  },
  picked_up: {
    title: 'Parcels Picked Up',
    icon: <Clock className="stroke-yellow-500 size-7" />,
    bg: 'bg-yellow-500/25',
  },
  failed: {
    title: 'Failed Deliveries',
    icon: <AlertTriangle className="stroke-red-500 size-7" />,
    bg: 'bg-red-500/25',
  },
};

const AdminOverviewState = () => {
  const { data, isLoading, isError } = useParcelStatusDistributionQuery();

  return (
    <section>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {isError ? (
          <div>ddd</div>
        ) : isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </>
        ) : (
          <>
            {data?.data.data.map((item) => (
              <Card key={item.status}>
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    {statusConfig[item.status].title}
                  </CardTitle>
                  <CardAction>
                    <span
                      className={`size-12 flex items-center justify-center ${
                        statusConfig[item.status].bg
                      } rounded-md`}
                    >
                      {statusConfig[item.status].icon}
                    </span>
                  </CardAction>
                  <Heading as="h5">{item.count}</Heading>
                </CardHeader>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default AdminOverviewState;
