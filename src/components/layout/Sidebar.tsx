import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  BarChart2,
  LifeBuoy,
  CheckSquare,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/reports', label: 'Reports', icon: BarChart2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen w-16 bg-sidebar text-sidebar-foreground',
        'flex flex-col items-center justify-between py-4 border-r border-sidebar-border z-20',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-2">
        <NavLink to="/" className="mb-4" title="Helpdesk Home">
          <LifeBuoy className="h-8 w-8 text-sidebar-primary" />
        </NavLink>
        <nav className="flex flex-col items-center space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                cn(
                  'p-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
                  isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/70'
                )
              }
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="pb-2">
        <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-primary" title="Helpdesk Dashboard">
          <CheckSquare className="h-7 w-7" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
