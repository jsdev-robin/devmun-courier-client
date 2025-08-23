'use client';

import React, { CSSProperties } from 'react';
import { Header } from '@tanstack/react-table';
import { Th } from '../../ui/flex-table';
import GridHeaderSort from '../header/grid-header-sort';
import GridHeaderFilter from '../header/grid-header-filter';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../../../lib/utils';
import GridHeaderDnd from '../header/grid-header-dnd';
import GridHeaderResize from '../header/grid-header-resize';
import { getPinStyles } from '../utils/getPinStyles';
import GridHeaderMenu from '../header/grid-header-menu';
import { useDataGrid } from '../contexts/data-grid-contexts';

const MunGridTh = <T,>({ header }: { header: Header<T, unknown> }) => {
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
    width: header.column.getSize(),
    minWidth: header.column.getSize(),
    maxWidth: ['select', 'actions', 'pin', 'drag-handle'].includes(
      header.column.id,
    )
      ? header.column.getSize()
      : undefined,
    flex: ['select', 'actions', 'pin', 'drag-handle'].includes(header.column.id)
      ? undefined
      : 1,
    ...(!split && getPinStyles(header.column)),
  };

  return (
    <Th
      key={header.id}
      style={style}
      ref={setNodeRef}
      className={cn('p-0 truncate group relative', {
        'bg-card shadow-xl/30': isDragging,
      })}
    >
      {header.isPlaceholder ? null : (
        <>
          <div className="space-y-1.5 w-full">
            <div className="p-1.5 flex items-center justify-between gap-1.5">
              <GridHeaderSort header={header} />
              <div className="flex items-center gap-1.5">
                <GridHeaderDnd listeners={listeners} header={header} />
                <GridHeaderMenu header={header} />
              </div>
            </div>
            <GridHeaderFilter column={header.column} />
          </div>
          <GridHeaderResize header={header} />
        </>
      )}
    </Th>
  );
};

export default MunGridTh;
