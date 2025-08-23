'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { FlexTable, Thead, Tr } from '../../ui/flex-table';
import { cn } from '../../../lib/utils';
import MunGridTh from './mun-grid-th';

interface FlexGridHeaderSplitProps {
  direction?: 'left' | 'right';
}

const MunGridSplitThead: React.FC<FlexGridHeaderSplitProps> = ({
  direction = 'left',
}) => {
  const { table, columnOrder, paneRef4, paneRef5 } = useDataGrid();
  const isActionsPinned = !!table.getColumn('actions')?.getIsPinned();

  return (
    <div
      className="w-full bg-muted border-b border-border overflow-y-scroll firefox:overflow-x-hidden not-firefox:[&::-webkit-scrollbar]:h-0 firefox:[scrollbar-color:transparent_transparent]"
      ref={direction === 'left' ? paneRef4 : paneRef5}
    >
      <FlexTable
        className={cn(isActionsPinned && 'h-[calc(var(--header-h)-0.5px)]')}
      >
        <Thead>
          {(direction === 'left'
            ? table.getLeftHeaderGroups()
            : table.getRightHeaderGroups()
          ).map((headerGroup) => (
            <Tr
              key={headerGroup.id}
              className="*:border-r *:border-border h-full"
            >
              <SortableContext
                items={columnOrder || []}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <MunGridTh key={header.id} header={header} />
                ))}
              </SortableContext>
            </Tr>
          ))}
        </Thead>
      </FlexTable>
    </div>
  );
};
export default MunGridSplitThead;
