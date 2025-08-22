'use client';

import Link from 'next/link';
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
import {
  userAuthApi,
  useSignoutMutation,
} from '../../lib/features/services/auth/authApi';
import useUser from '../../guard/useUser';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';
import MainLogo from '../ui/main-logo';

const Header = ({
  role,
}: {
  role?: {
    agent: unknown;
    customer: unknown;
  };
}) => {
  const [signout, { isLoading }] = useSignoutMutation();
  const user = useUser();

  const handleLogout = async () => {
    await toast.promise(signout().unwrap(), {
      loading: 'Signing out...',
      success: (res) => {
        window.location.href = '/sign-in';
        return res.message;
      },
      error: (err) => err?.data?.message,
    });
  };

  const { isLoading: profileLoading, data } =
    userAuthApi.endpoints.getProfile.useQuery();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <MainLogo />
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-5">
              {[
                { name: 'Home', href: '#' },
                { name: 'Services', href: '#' },
                { name: 'Pricing', href: '#' },
                { name: 'About Us', href: '#' },
                { name: 'Contact', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-primary font-medium py-2 px-3"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {role?.agent || role?.customer ? (
            <>
              {profileLoading ? (
                <Skeleton className="size-10 rounded-full" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <Link
                        href={
                          data?.data.user.role === 'admin'
                            ? '/dashboard/admin/overview'
                            : data?.data.user.role === 'agent'
                            ? '/dashboard/agent/overview'
                            : '/dashboard/customer/overview'
                        }
                      >
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
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
              )}
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/sign-in"
                className="border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
