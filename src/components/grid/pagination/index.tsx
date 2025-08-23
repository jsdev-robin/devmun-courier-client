'use client';

import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Input } from '../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { useDataGrid } from '../contexts/data-grid-contexts';
import PaginationSkeleton from '../ui/pagination-skeleton';
import { cn } from '../../../lib/utils';
interface PaginationProps {
  pagination?: number[];
}

const Pagination: React.FC<PaginationProps> = ({ pagination = [] }) => {
  const { table, isLoading, isError } = useDataGrid();
  const [open, setOpen] = useState<boolean>(false);

  return isLoading || isError ? (
    <PaginationSkeleton />
  ) : (
    <div className="flex items-center justify-between gap-6">
      <div className="text-sm text-muted-foreground hidden md:block">
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {table.getRowCount().toLocaleString()} Rows
      </div>
      <div className="flex items-center gap-6 ml-auto">
        <span className="items-center gap-1.5 whitespace-nowrap hidden sm:flex">
          <span className="text-sm text-muted-foreground">Go to</span>
          <Input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="h-8 w-16"
          />
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-20 hidden md:inline-flex"
            >
              {table.getState().pagination.pageSize}
              <ChevronDown className="ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-20 p-1.5">
            {pagination.map((pageSize) => (
              <Button
                key={pageSize}
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full',
                  table.getState().pagination.pageSize === pageSize &&
                    'bg-accent',
                )}
                onClick={() => {
                  table.setPageSize(pageSize);
                  setOpen(false);
                }}
              >
                {pageSize}
                <Check
                  className={cn(
                    'ml-auto',
                    table.getState().pagination.pageSize === pageSize
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </Button>
            ))}
          </PopoverContent>
        </Popover>
        <span className="flex items-center gap-1.5 text-sm">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
