import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Settings as SettingsIcon } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTimestamp(); // Set initial time
    const timerId = setInterval(updateTimestamp, 60000); // Update every minute

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-16 right-0 h-16 bg-card text-card-foreground z-10',
        'flex items-center justify-between px-4 border-b border-border',
        className
      )}
    >
      {/* Left part of the header, e.g., for breadcrumbs or page title */}
      <div>
        {/* Example: <h1 className="text-lg font-semibold">Dashboard Overview</h1> */}
      </div>

      {/* Right part of the header */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-sm text-muted-foreground hidden sm:inline-block">{currentTime}</span>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        {/* User Profile Avatar - Placeholder */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/40x40/5EC2FE/1E1E2D?text=U" alt="User Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopHeader;
