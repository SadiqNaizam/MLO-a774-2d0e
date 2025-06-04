import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-background text-foreground', className)}>
      <Sidebar />
      <TopHeader />
      <main
        className={cn(
          'fixed top-16 left-16 bottom-0 right-0 overflow-y-auto'
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
