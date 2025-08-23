import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import React from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const PaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="text-sm text-muted-foreground hidden md:block">
        Showing 0 of 0 Rows
      </div>
      <div className="flex items-center gap-6 ml-auto">
        <span className="items-center gap-1.5 whitespace-nowrap hidden sm:flex">
          <span className="text-sm text-muted-foreground">Go to</span>
          <Input
            type="number"
            disabled={true}
            className="h-8 w-16"
            placeholder="1"
          />
        </span>
        <Button
          variant="outline"
          size="sm"
          className="w-20 hidden md:inline-flex"
          disabled={true}
        >
          20
          <ChevronDown className="ml-auto" />
        </Button>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <div>Page</div>
          <strong>1 of ..</strong>
        </span>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled={true}>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" size="sm" disabled={true}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" disabled={true}>
            <ChevronRight />
          </Button>
          <Button variant="outline" size="sm" disabled={true}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationSkeleton;
