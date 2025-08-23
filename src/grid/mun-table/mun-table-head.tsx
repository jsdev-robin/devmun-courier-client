'use client';

import React, { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { getPinStyles } from '../utils/getPinStyles';
import { TableHead } from './mun-table-layout';
import GridHeaderSort from '../header/grid-header-sort';
import GridHeaderDnd from '../header/grid-header-dnd';
import GridHeaderMenu from '../header/grid-header-menu';
import GridHeaderFilter from '../header/grid-header-filter';
// import GridHeaderResize from '../header/grid-header-resize';
import { Header } from '@tanstack/react-table';
import { cn } from '../../lib/utils';
const MunTableHead = <T,>({ header }: { header: Header<T, unknown> }) => {
  const { listeners, isDragging, setNodeRef, transform } = useSortable({
    id: header.column.id,
  });
  const { split } = useDataGrid();
  const style: CSSProperties = {
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 10 : 0,
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    ...(!split && getPinStyles(header.column)),
  };

  return (
    <TableHead
      colSpan={header.colSpan}
      style={style}
      ref={setNodeRef}
      className={cn('p-0 truncate group relative', {
        'bg-card shadow-xl/30': isDragging,
      })}
    >
      {header.isPlaceholder ? null : (
        <>
          <div className="space-y-1.5 w-full">
            <div className="p-1.5 flex items-center justify-between gap-3">
              <GridHeaderSort header={header} />
              <div className="flex items-center gap-1.5">
                <GridHeaderDnd header={header} listeners={listeners} />
                <GridHeaderMenu header={header} />
              </div>
            </div>
            <GridHeaderFilter column={header.column} />
          </div>
          {/* <GridHeaderResize header={header} /> */}
        </>
      )}
    </TableHead>
  );
};

export default MunTableHead;
