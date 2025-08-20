import React from 'react';
import Heading from '../ui/heading';
import Typography from '../ui/typography';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';

const HomHero = () => {
  return (
    <section className="bg-[url('/images/boy.jpg')] bg-[100%_auto] bg-no-repeat p-4 h-[calc(100vh-80px)]">
      <div className="container h-full">
        <div className="grid grid-cols-2 h-full">
          <div className="h-full flex flex-col justify-center gap-6">
            <Heading as="h2" className="font-bold">
              Fast & Reliable Courier Services
            </Heading>
            <Typography>
              Track your parcels in real-time and manage all your deliveries
              from one place
            </Typography>
            <div>
              <Link href="/" className={cn(buttonVariants(), 'inline-block')}>
                Book a Parcel Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomHero;
