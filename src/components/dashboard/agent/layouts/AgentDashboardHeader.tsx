'use client';

import React from 'react';
import { LogOut, TruckElectric } from 'lucide-react';
import { useSignoutMutation } from '../../../../lib/features/services/auth/authApi';
import useUser from '../../../../guard/useUser';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const AgentDashboardHeader = () => {
  const [signout, { isLoading }] = useSignoutMutation();
  const user = useUser();

  const handleLogout = async () => {
    await toast.promise(signout().unwrap(), {
      loading: 'Signing out...',
      success: (res) => {
        window.location.href = '/';
        return res.message || 'Logout';
      },
      error: (err) => err?.data?.message || 'Logout',
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between gap-6 h-16">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center">
              <div className="gradient-bg p-2.5 rounded-lg">
                <TruckElectric className="text-background" />
              </div>
              <span className="ml-2 text-xl font-bold text-dark">
                ParcelTrack Agent
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>{user?.familyName[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/customer/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AgentDashboardHeader;
