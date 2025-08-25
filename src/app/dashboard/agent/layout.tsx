import React from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../../../components/ui/sidebar';
import { cookies } from 'next/headers';
import { Separator } from '../../../components/ui/separator';
import DatePicker from '../../../components/ui/date-picker';
import { AppSidebar } from '../../../components/dashboard/agent/layouts/app-sidebar';

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 bg-sidebar px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <DatePicker />
        </header>
        <div className="p-4 space-y-6 lg:space-y-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
