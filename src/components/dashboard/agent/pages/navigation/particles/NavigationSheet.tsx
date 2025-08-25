import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import NavigationInformation from './NavigationInformation';
import { Button } from '../../../../../ui/button';
import { Menu } from 'lucide-react';

interface NavigationSheetProps {
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

const NavigationSheet: React.FC<NavigationSheetProps> = ({
  duration,
  distance,
  steps,
}) => {
  return (
    <div className="absolute bottom-2 right-2 z-50 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
            <NavigationInformation
              duration={duration}
              distance={distance}
              steps={steps}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationSheet;
