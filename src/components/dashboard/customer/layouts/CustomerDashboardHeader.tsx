'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useSignoutMutation } from '../../../../lib/features/services/auth/authApi';
import { toast } from 'sonner';
import useUser from '../../../../guard/useUser';
import MainLogo from '../../../ui/main-logo';
import Link from 'next/link';

const CustomerDashboardHeader = () => {
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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MainLogo />
          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-bold">
                    {user?.displayName}
                  </span>
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
                        <Link href={'/'}>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={isLoading}
                      >
                        <LogOut />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerDashboardHeader;
