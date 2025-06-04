import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For potential user avatars

interface DataListItem {
  id: string | number;
  primaryText: string;
  secondaryText?: string; // e.g., role or team
  value: string | number;
  avatarSrc?: string;
  avatarFallback?: string;
}

const topSolversData: DataListItem[] = [
  { id: 1, primaryText: 'Ava Gilbert', value: 222, avatarFallback: 'AG' },
  { id: 2, primaryText: 'Tobias Merritt', value: 201, avatarFallback: 'TM' },
  { id: 3, primaryText: 'Kaisley Burton', value: 176, avatarFallback: 'KB' },
  { id: 4, primaryText: 'Zander Hardin', value: 165, avatarFallback: 'ZH' },
  { id: 5, primaryText: 'Vada Proctor', value: 155, avatarFallback: 'VP' },
  { id: 6, primaryText: 'Vance Blanchard', value: 153, avatarFallback: 'VB' },
  { id: 7, primaryText: 'Layne McIntyre', value: 149, avatarFallback: 'LM' },
  { id: 8, primaryText: 'Loretta Hebert', value: 132, avatarFallback: 'LH' },
];

const agentScoresData: DataListItem[] = [
  { id: 1, primaryText: 'Zander Hardin', value: '91%', avatarFallback: 'ZH' },
  { id: 2, primaryText: 'Vance Blanchard', value: '91%', avatarFallback: 'VB' },
  { id: 3, primaryText: 'Ava Gilbert', value: '90%', avatarFallback: 'AG' },
  { id: 4, primaryText: 'Kaisley Burton', value: '89%', avatarFallback: 'KB' },
  { id: 5, primaryText: 'Aron Barnett', value: '88%', avatarFallback: 'AB' },
  { id: 6, primaryText: 'Nalani Prince', value: '86%', avatarFallback: 'NP' },
  { id: 7, primaryText: 'Vada Proctor', value: '85%', avatarFallback: 'VP' },
  { id: 8, primaryText: 'Loretta Hebert', value: '85%', avatarFallback: 'LH' },
  { id: 9, primaryText: 'Guillermo Carson', value: '85%', avatarFallback: 'GC' },
];

interface DataListCardProps {
  title: string;
  description?: string;
  items: DataListItem[];
  itemType?: 'solver' | 'score'; // To slightly vary display if needed
  className?: string;
}

const DataListCard: React.FC<DataListCardProps> = ({
  title,
  description,
  items,
  itemType = 'solver',
  className,
}) => {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-y-auto pt-0 pr-3 pl-6 pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 text-xs">
                {item.avatarSrc && <AvatarImage src={item.avatarSrc} alt={item.primaryText} />}
                <AvatarFallback className="bg-primary/20 text-primary">
                  {item.avatarFallback || item.primaryText.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{item.primaryText}</p>
                {item.secondaryText && (
                  <p className="text-xs text-muted-foreground">{item.secondaryText}</p>
                )}
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Exporting example data configurations for use in pages
export const topSolversCardData: DataListCardProps = {
  title: 'Top ticket solvers this week',
  items: topSolversData,
  itemType: 'solver',
};

export const agentScoresCardData: DataListCardProps = {
  title: 'Agent scores',
  items: agentScoresData,
  itemType: 'score',
};

export default DataListCard;
