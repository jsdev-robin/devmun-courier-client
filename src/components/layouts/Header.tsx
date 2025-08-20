import Link from 'next/link';
import React from 'react';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';
import Heading from '../ui/heading';

const Header = () => {
  return (
    <header className="bg-sky-500 py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Heading as="h4" className="text-background font-bold">
              ParcelTrack
            </Heading>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
