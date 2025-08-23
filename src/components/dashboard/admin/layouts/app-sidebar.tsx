'use client';

import * as React from 'react';
import {
  LayoutDashboard,
  Package2,
  Route,
  UserLock,
  Users,
} from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard/admin/overview',
      icon: LayoutDashboard,
    },
    {
      title: 'Parcels',
      url: '/dashboard/admin/parcels',
      icon: Package2,
    },
    {
      title: 'Customers',
      url: '/dashboard/admin/customers',
      icon: Users,
    },
    {
      title: 'Agents',
      url: '/dashboard/admin/agents',
      icon: UserLock,
    },
    {
      title: 'Delivery Route',
      url: '/dashboard/admin/delivery-route',
      icon: Route,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
