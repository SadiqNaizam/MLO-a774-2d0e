import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  BarChart2, // For Reports
  CheckSquare, // For Helpdesk Logo
  LifeBuoy // Fallback/general helpdesk icon
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

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  // In a real app, you might get current path from useLocation()
  // For this example, we'll assume '/dashboard' is active or rely on NavLink's activeClassName/style

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen w-16 bg-sidebar text-sidebar-foreground',
        'flex flex-col items-center justify-between py-4 border-r border-sidebar-border',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-2">
        {/* Placeholder for a more prominent logo if available */}
        <NavLink to="/" className="mb-4">
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
        <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-primary">
          <CheckSquare className="h-7 w-7" /> 
          {/* Icon from image, representing "Helpdesk Dashboard" branding */}
        </Button>
      </div>
    </aside>
  );
};

export default SidebarNav;
