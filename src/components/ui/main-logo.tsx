import { Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MainLogo = () => {
  return (
    <Link href="/">
      <div className="flex-shrink-0 flex items-center">
        <Package className="stroke-primary" />
        <span className="ml-2 text-xl font-bold text-primary">ParcelTrack</span>
      </div>
    </Link>
  );
};

export default MainLogo;
