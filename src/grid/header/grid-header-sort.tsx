'use client';

import React from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { cn } from '../../lib/utils';
const GridHeaderSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  const isSelect = ['select'].includes(header.column.id);
  return (
    <div
      className={cn(
        'flex items-center',
        !isSelect && 'truncate',
        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
      )}
      onClick={header.column.getToggleSortingHandler()}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
            ? 'Sort descending'
            : 'Clear sort'
          : undefined
      }
    >
      <div className={cn(!isSelect && 'truncate capitalize')}>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      {{
        asc: <ChevronUpIcon />,
        desc: <ChevronDownIcon />,
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default GridHeaderSort;
