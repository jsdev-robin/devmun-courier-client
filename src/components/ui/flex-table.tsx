'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

function FlexTable({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-container"
      className={cn('text-sm min-w-max', className)}
      {...props}
    />
  );
}

function Thead({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-header"
      className={cn('contents [&_div]:border-b-0', className)}
      {...props}
    />
  );
}

function Tbody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-body"
      className={cn('contents [&_div:last-child]:border-b-0', className)}
      {...props}
    />
  );
}

function Tfoot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-footer"
      className={cn(
        'contents bg-muted/50 font-medium border-t [&_div]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function Tr({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-row"
      className={cn(
        'flex items-stretch hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ',
        className,
      )}
      {...props}
    />
  );
}

function Th({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      tabIndex={0}
      data-slot="table-head"
      className={cn(
        'flex items-center text-foreground px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-cell"
      tabIndex={0}
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function Caption({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export { FlexTable, Thead, Tbody, Tfoot, Tr, Th, Td, Caption };
