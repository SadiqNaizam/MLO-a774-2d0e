import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface GaugeDataItem {
  name: string;
  value: number;
  color: string;
}

interface StatsCardProps {
  title?: string;
  description?: string; // For subtext like 'Avg. team score'
  metricValue?: string; // The large text, e.g., "95%" or "18m"
  metricLabel?: string; // Label below/beside metric, e.g., "First response time"
  gaugeData?: {
    value: number; // Percentage value, e.g., 95 for 95%
    color: string; // Fill color for the gauge active part
    backgroundColor?: string; // Fill color for the gauge background/track part
    rangeMinLabel?: string; // e.g. "80%"
    rangeMaxLabel?: string; // e.g. "100%"
  };
  items?: Array<{ value: string; label: string; subLabel?: string }>; // For multiple text stats
  variant?: 'default' | 'critical' | 'highlight'; // 'critical' for unassigned, 'highlight' for CSAT/QA
  icon?: React.ElementType; // For critical variant icon
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  description,
  metricValue,
  metricLabel,
  gaugeData,
  items,
  variant = 'default',
  icon: IconComponent,
  className,
}) => {
  const cardBaseClass = 'h-full flex flex-col';
  const cardBgClass = variant === 'critical' ? 'bg-destructive/10 border-destructive/30' : variant === 'highlight' ? 'bg-card' : 'bg-card';

  const pieData: GaugeDataItem[] = gaugeData
    ? [
        { name: 'value', value: gaugeData.value, color: gaugeData.color },
        {
          name: 'remainder',
          value: 100 - gaugeData.value,
          color: gaugeData.backgroundColor || 'hsl(var(--muted))',
        },
      ]
    : [];

  return (
    <Card className={cn(cardBaseClass, cardBgClass, className)}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-foreground/80">{title}</CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="flex-1 flex flex-col justify-center p-4">
        {gaugeData && metricValue && (
          <div className="relative w-full h-40 sm:h-48 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{metricValue}</span>
            </div>
            {(gaugeData.rangeMinLabel || gaugeData.rangeMaxLabel) && (
                <div className="absolute bottom-0 sm:bottom-2 w-[calc(100%-40px)] flex justify-between text-xs text-muted-foreground px-2">
                    <span>{gaugeData.rangeMinLabel}</span>
                    <span>{gaugeData.rangeMaxLabel}</span>
                </div>
            )}
          </div>
        )}

        {items && (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-foreground">{item.value}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.subLabel && <p className="text-xs text-muted-foreground/70">{item.subLabel}</p>}
              </div>
            ))}
          </div>
        )}

        {variant === 'critical' && metricValue && (
          <div className="flex flex-col items-start relative h-full justify-between">
            <div>
              <div className="text-4xl font-bold text-foreground">{metricValue}</div>
              {metricLabel && <p className="text-sm text-muted-foreground">{metricLabel}</p>}
            </div>
            {IconComponent && (
              <div className="absolute bottom-0 right-0 p-1 bg-destructive rounded-full">
                <IconComponent className="h-6 w-6 text-destructive-foreground" />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Example data for demonstration in a story or page
export const csatCardData: StatsCardProps = {
  title: 'CSAT this month',
  metricValue: '95%',
  gaugeData: {
    value: 95,
    color: 'hsl(var(--accent))', // green
    backgroundColor: 'hsl(var(--muted))', 
    rangeMinLabel: '80%',
    rangeMaxLabel: '100%',
  },
  variant: 'highlight',
};

export const todayStatsData: StatsCardProps = {
  title: 'Today',
  items: [
    { value: '18m', label: 'First response time' },
    { value: '1h', label: 'Full resolution time' },
  ],
  variant: 'default',
};

export const unassignedTicketsData: StatsCardProps = {
  // No title, metricValue is prominent
  metricValue: '45',
  metricLabel: 'Unassigned tickets',
  variant: 'critical',
  icon: AlertTriangle,
  className: 'bg-background border border-destructive/50', // Special background as per image
};

export const qaAvgScoreData: StatsCardProps = {
  title: 'QA this week',
  description: 'Avg. team score',
  metricValue: '88%',
  gaugeData: {
    value: 88,
    color: 'hsl(var(--primary))', // Using primary blue for variety, could be green too
    backgroundColor: 'hsl(var(--muted))', 
    rangeMinLabel: '50%',
    rangeMaxLabel: '100%',
  },
  variant: 'highlight',
};


export default StatsCard;
