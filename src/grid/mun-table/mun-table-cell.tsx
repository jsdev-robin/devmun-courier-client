'use client';

import React, { CSSProperties } from 'react';
import { Cell, flexRender } from '@tanstack/react-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getPinStyles } from '../utils/getPinStyles';
import { TableCell } from './mun-table-layout';
import { cn } from '../../lib/utils';
const MunTableCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { split } = useDataGrid();
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });
  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    zIndex: isDragging ? 1 : 0,
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    ...(!split && getPinStyles(cell.column)),
  };

  return (
    <TableCell
      key={cell.id}
      style={style}
      ref={setNodeRef}
      className={cn('truncate', {
        'bg-muted shadow-xl/30': isDragging,
      })}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default MunTableCell;
