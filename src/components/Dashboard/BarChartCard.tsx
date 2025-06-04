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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';

interface BarChartDataPoint {
  name: string;
  value: number;
}

const barChartData: BarChartDataPoint[] = [
  { name: 'Open', value: 230 },
  { name: 'Pending', value: 111 },
  { name: 'Resolved', value: 589 },
  { name: 'Closed: Resolved', value: 493 },
  { name: 'On Hold', value: 78 }, // Added for complexity
  { name: 'Escalated', value: 150 }, // Added for complexity
];

interface BarChartCardProps {
  title?: string;
  description?: string;
  data?: BarChartDataPoint[];
  className?: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  title = 'Tickets by status this week',
  description,
  data = barChartData,
  className,
}) => {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-4 pr-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              width={110} // Adjust based on label length
              dx={-5} // Move labels slightly left
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" barSize={10} radius={[0, 4, 4, 0]}>
              <LabelList 
                dataKey="value" 
                position="right" 
                style={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
