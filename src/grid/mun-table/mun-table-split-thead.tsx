'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Table, TableHeader, TableRow } from './mun-table-layout';
import { cn } from '../../lib/utils';
import MunTableHead from './mun-table-head';

interface MunTableSplitHeaderProps {
  direction?: 'left' | 'right';
}

const MunTableSplitHeader: React.FC<MunTableSplitHeaderProps> = ({
  direction = 'left',
}) => {
  const { table, columnOrder, paneRef4, paneRef5 } = useDataGrid();
  const isActionsPinned = !!table.getColumn('actions')?.getIsPinned();

  return (
    <div
      className="w-full bg-muted border-b border-border overflow-y-scroll firefox:overflow-x-hidden not-firefox:[&::-webkit-scrollbar]:h-0 firefox:[scrollbar-color:transparent_transparent]"
      ref={direction === 'left' ? paneRef4 : paneRef5}
    >
      <Table
        className={cn(isActionsPinned && 'h-[calc(var(--header-h)-0.5px)]')}
      >
        <TableHeader>
          {(direction === 'left'
            ? table.getLeftHeaderGroups()
            : table.getRightHeaderGroups()
          ).map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="*:border-r *:border-border"
            >
              <SortableContext
                items={columnOrder || []}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <MunTableHead key={header.id} header={header} />
                ))}
              </SortableContext>
            </TableRow>
          ))}
        </TableHeader>
      </Table>
    </div>
  );
};

export default MunTableSplitHeader;
