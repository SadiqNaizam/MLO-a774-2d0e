import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import BarChartCard from '@/components/Dashboard/BarChartCard';
import LineChartCard from '@/components/Dashboard/LineChartCard';
import DataListCard from '@/components/Dashboard/DataListCard';
import { AlertTriangle } from 'lucide-react';

// Data for CSAT Card
const csatCardData = {
  title: 'CSAT this month',
  metricValue: '95%',
  gaugeData: {
    value: 95,
    color: 'hsl(var(--accent))', // Green
    backgroundColor: 'hsl(var(--muted))',
    rangeMinLabel: '80%',
    rangeMaxLabel: '100%',
  },
  variant: 'highlight' as const,
};

// Data for Today Stats Card
const todayStatsData = {
  title: 'Today',
  items: [
    { value: '18m', label: 'First response time' },
    { value: '1h', label: 'Full resolution time' },
  ],
  variant: 'default' as const,
};

// Data for Unassigned Tickets Card
const unassignedTicketsData = {
  metricValue: '45',
  metricLabel: 'Unassigned tickets',
  variant: 'critical' as const,
  icon: AlertTriangle,
  className: 'bg-card border border-destructive/50', // Custom styling to match image and component example
};

// Data for QA Average Score Card
const qaAvgScoreData = {
  title: 'QA this week',
  description: 'Avg. team score',
  metricValue: '88%',
  gaugeData: {
    value: 88,
    color: 'hsl(var(--primary))', // Blue
    backgroundColor: 'hsl(var(--muted))',
    rangeMinLabel: '50%',
    rangeMaxLabel: '100%',
  },
  variant: 'highlight' as const,
};

// Data for Top Ticket Solvers Card
const topSolversData = {
  title: 'Top ticket solvers this week',
  items: [
    { id: 'solver-1', primaryText: 'Ava Gilbert', value: 222, avatarFallback: 'AG' },
    { id: 'solver-2', primaryText: 'Tobias Merritt', value: 201, avatarFallback: 'TM' },
    { id: 'solver-3', primaryText: 'Kaisley Burton', value: 176, avatarFallback: 'KB' },
    { id: 'solver-4', primaryText: 'Zander Hardin', value: 165, avatarFallback: 'ZH' },
    { id: 'solver-5', primaryText: 'Vada Proctor', value: 155, avatarFallback: 'VP' },
    { id: 'solver-6', primaryText: 'Vance Blanchard', value: 153, avatarFallback: 'VB' },
    { id: 'solver-7', primaryText: 'Layne McIntyre', value: 149, avatarFallback: 'LM' },
    { id: 'solver-8', primaryText: 'Loretta Hebert', value: 132, avatarFallback: 'LH' },
  ],
  itemType: 'solver' as const,
};

// Data for Tickets By Status Bar Chart Card
const ticketsByStatusData = {
  title: 'Tickets by status this week',
  data: [
    { name: 'Open', value: 230 },
    { name: 'Pending', value: 111 },
    { name: 'Resolved', value: 589 },
    { name: 'Closed: Resolved', value: 493 },
    { name: 'On Hold', value: 78 },
    { name: 'Escalated', value: 150 },
  ],
};

// Data for Ticket Volume Line Chart Card
const ticketVolumeData = {
  title: 'Ticket volume this week',
  data: [
    { date: '8 Jul', volume: 280 },
    { date: '9 Jul', volume: 120 },
    { date: '10 Jul', volume: 60 },
    { date: '11 Jul', volume: 400 },
    { date: '12 Jul', volume: 250 },
    { date: '13 Jul', volume: 270 },
    { date: '14 Jul', volume: 310 },
    { date: '15 Jul', volume: 180 }, 
    { date: '16 Jul', volume: 500 },
  ],
};

// Data for Agent Scores List Card
const agentScoresListData = {
  title: 'Agent scores',
  items: [
    { id: 'agent-1', primaryText: 'Zander Hardin', value: '91%', avatarFallback: 'ZH' },
    { id: 'agent-2', primaryText: 'Vance Blanchard', value: '91%', avatarFallback: 'VB' },
    { id: 'agent-3', primaryText: 'Ava Gilbert', value: '90%', avatarFallback: 'AG' },
    { id: 'agent-4', primaryText: 'Kaisley Burton', value: '89%', avatarFallback: 'KB' },
    { id: 'agent-5', primaryText: 'Aron Barnett', value: '88%', avatarFallback: 'AB' },
    { id: 'agent-6', primaryText: 'Nalani Prince', value: '86%', avatarFallback: 'NP' },
    { id: 'agent-7', primaryText: 'Vada Proctor', value: '85%', avatarFallback: 'VP' },
    { id: 'agent-8', primaryText: 'Loretta Hebert', value: '85%', avatarFallback: 'LH' },
    { id: 'agent-9', primaryText: 'Guillermo Carson', value: '85%', avatarFallback: 'GC' },
  ],
  itemType: 'score' as const,
};

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: CSAT, Today, Unassigned */}
        <div className="space-y-6 flex flex-col">
          <StatsCard {...csatCardData} />
          <StatsCard {...todayStatsData} />
          <StatsCard {...unassignedTicketsData} />
        </div>

        {/* Column 2: Top Solvers, Ticket Volume */}
        <div className="space-y-6 flex flex-col">
          <DataListCard {...topSolversData} />
          <LineChartCard {...ticketVolumeData} />
        </div>

        {/* Column 3: Tickets by Status, QA Score, Agent Scores */}
        <div className="space-y-6 flex flex-col">
          <BarChartCard {...ticketsByStatusData} />
          <StatsCard {...qaAvgScoreData} />
          <DataListCard {...agentScoresListData} />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
