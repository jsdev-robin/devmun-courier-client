'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import SplitLoadingSkeleton from '../ui/split-loading-skeleton';
import { FlexTable, Tbody, Tr } from '../../ui/flex-table';
import { cn } from '../../../lib/utils';
import MunGridTd from './mun-grid-td';

interface GridMunBodySplitProps {
  direction?: 'left' | 'right';
}

const MunGridSplitTbody: React.FC<GridMunBodySplitProps> = ({
  direction = 'left',
}) => {
  const { table, paneRef6, paneRef7, columnOrder, isLoading } = useDataGrid();

  return (
    <div
      className="h-[75svh] lg:h-[75vh] bg-muted overflow-scroll"
      ref={direction === 'left' ? paneRef6 : paneRef7}
    >
      {isLoading ? (
        <SplitLoadingSkeleton />
      ) : (
        <FlexTable>
          <Tbody>
            {table.getTopRows().map((row) => (
              <Tr
                key={row.id}
                className={cn(
                  '*:border-r *:border-border h-10 [&_div]:h-full text-white bg-blue-950 hover:bg-blue-900 sticky',
                )}
                style={{
                  position: 'sticky',
                  top:
                    row.getIsPinned() === 'top'
                      ? `calc(${row.getPinnedIndex()} * var(--cell-h))`
                      : undefined,
                  zIndex: 10,
                }}
              >
                {(direction === 'left'
                  ? row.getLeftVisibleCells()
                  : row.getRightVisibleCells()
                ).map((cell) => (
                  <MunGridTd key={cell.id} cell={cell} />
                ))}
              </Tr>
            ))}
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
              >
                {(direction === 'left'
                  ? row.getLeftVisibleCells()
                  : row.getRightVisibleCells()
                ).map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder || []}
                    strategy={horizontalListSortingStrategy}
                  >
                    <MunGridTd cell={cell} key={cell.id} />
                  </SortableContext>
                ))}
              </Tr>
            ))}
            {table.getBottomRows().map((row) => (
              <Tr
                key={row.id}
                className={cn(
                  '*:border-r *:border-border h-10 [&_div]:h-full text-white bg-blue-950 hover:bg-blue-900 sticky',
                )}
                style={{
                  position: 'sticky',
                  bottom:
                    row.getIsPinned() === 'bottom'
                      ? `calc(${
                          table.getBottomRows().length -
                          1 -
                          row.getPinnedIndex()
                        } * var(--cell-h))`
                      : undefined,
                  zIndex: 10,
                }}
              >
                {(direction === 'left'
                  ? row.getLeftVisibleCells()
                  : row.getRightVisibleCells()
                ).map((cell) => (
                  <MunGridTd key={cell.id} cell={cell} />
                ))}
              </Tr>
            ))}
          </Tbody>
        </FlexTable>
      )}
    </div>
  );
};
export default MunGridSplitTbody;
