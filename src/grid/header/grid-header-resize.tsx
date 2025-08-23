'use client';

import React from 'react';
import { Header } from '@tanstack/react-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { cn } from '../../lib/utils';
const GridHeaderResize = <T,>({ header }: { header: Header<T, unknown> }) => {
  const { table } = useDataGrid();
  return (
    <div
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(
        'absolute top-0 right-0 h-full w-1 bg-blue-500/50 cursor-col-resize touch-none select-none opacity-0 group-hover:opacity-100 touch:opacity-100',
        table.options.columnResizeDirection,
        header.column.getIsResizing() && 'bg-blue-500 opacity-100',
      )}
    />
  );
};

export default GridHeaderResize;
