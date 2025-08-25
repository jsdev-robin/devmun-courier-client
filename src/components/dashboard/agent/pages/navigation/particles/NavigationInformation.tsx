'use client';

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import Heading from '../../../../../ui/heading';
import Typography from '../../../../../ui/typography';
import { formatDuration } from '../../../../../../utils/formatDuration';
import { cn } from '../../../../../../lib/utils';
import { buttonVariants } from '../../../../../ui/button';

interface NavigationInformationProps {
  duration: number | null;
  distance: number | null;
  steps: {
    maneuver: {
      instruction: string;
      location: [number, number];
    };
    distance: number;
    duration: number;
  }[];
}

const NavigationInformation: React.FC<NavigationInformationProps> = ({
  duration,
  distance,
  steps,
}) => {
  return (
    <div>
      <div className="gradient-bg p-4 text-white">
        <Heading as="h6" className="text-white">
          Active Navigation
        </Heading>
        <Typography variant="sm" className="text-white">
          Delivering to destination
        </Typography>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p>
            <strong>Distance:</strong>{' '}
            {distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculating...'}
          </p>
          <p>
            <strong>Duration:</strong>{' '}
            {duration ? formatDuration(duration) : 'Calculating...'}
          </p>
        </div>
        <div>
          <Heading as="h6" className="mb-4">
            Turn-by-Turn Directions
          </Heading>
          {steps.length === 0 ? (
            <p>Waiting for route...</p>
          ) : (
            <ol className="list-decimal ml-5 space-y-2 text-sm">
              {steps.map((step, idx) => (
                <li key={idx}>
                  {step.maneuver.instruction} (
                  {(step.distance / 1000).toFixed(2)} km)
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <div className="bottom-0 bg-foreground p-4 w-full sticky">
        <Link href={`tel:01734`} className={cn(buttonVariants(), 'w-full')}>
          <Phone />
          Call customer (Robin)
        </Link>
      </div>
    </div>
  );
};

export default NavigationInformation;
