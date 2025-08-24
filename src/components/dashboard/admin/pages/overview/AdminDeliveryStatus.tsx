'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useParcelStatusDistributionQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';

const chartConfig = {
  count: {
    label: 'count',
  },
  booked: {
    label: 'Booked',
    color: 'var(--chart-1)',
  },
  picked_up: {
    label: 'Picked Up',
    color: 'var(--chart-2)',
  },
  in_transit: {
    label: 'In Transit',
    color: 'var(--chart-3)',
  },
  delivered: {
    label: 'Delivered',
    color: 'var(--chart-4)',
  },
  failed: {
    label: 'failed',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const AdminDeliveryStatus = () => {
  const { data } = useParcelStatusDistributionQuery();
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={data?.data.data} dataKey="count" nameKey="status">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total count for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminDeliveryStatus;
