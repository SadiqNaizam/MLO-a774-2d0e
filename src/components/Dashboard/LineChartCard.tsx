import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface LineChartDataPoint {
  date: string;
  volume: number;
  previousVolume?: number; // Optional: for comparison line
}

const lineChartData: LineChartDataPoint[] = [
  { date: '8 Jul', volume: 280, previousVolume: 200 },
  { date: '9 Jul', volume: 120, previousVolume: 150 },
  { date: '10 Jul', volume: 60, previousVolume: 100 },
  { date: '11 Jul', volume: 400, previousVolume: 350 },
  { date: '12 Jul', volume: 250, previousVolume: 300 },
  { date: '13 Jul', volume: 270, previousVolume: 240 },
  { date: '14 Jul', volume: 310, previousVolume: 280 },
  { date: '15 Jul', volume: 180, previousVolume: 220 }, // Added for complexity
  { date: '16 Jul', volume: 500, previousVolume: 450 }, // Added for complexity
];

interface LineChartCardProps {
  title?: string;
  description?: string;
  data?: LineChartDataPoint[];
  className?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title = 'Ticket volume this week',
  description,
  data = lineChartData,
  className,
}) => {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 'bold' }}
            />
            {/* <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} /> */}
            <Line
              type="monotone"
              dataKey="volume"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              name="Current Volume"
            />
            {data[0]?.previousVolume !== undefined && (
                <Line
                  type="monotone"
                  dataKey="previousVolume"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Previous Volume"
                />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
