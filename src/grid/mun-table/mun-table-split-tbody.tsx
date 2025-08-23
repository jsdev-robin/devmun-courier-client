'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import SplitLoadingSkeleton from '../ui/split-loading-skeleton';
import { Table, TableBody, TableRow } from './mun-table-layout';
import { cn } from '../../lib/utils';
import MunTableCell from './mun-table-cell';

interface GridMunBodySplitProps {
  direction?: 'left' | 'right';
}

const MunTableSplitBody: React.FC<GridMunBodySplitProps> = ({
  direction = 'left',
}) => {
  const { table, paneRef6, paneRef7, columnOrder, isLoading } = useDataGrid();

  return (
    <div
      className="h-[75vh] bg-muted overflow-scroll"
      ref={direction === 'left' ? paneRef6 : paneRef7}
    >
      {isLoading ? (
        <SplitLoadingSkeleton />
      ) : (
        <Table>
          <TableBody>
            {table.getTopRows().map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  '*:border-r *:border-border text-white bg-blue-950 hover:bg-blue-900 h-[var(--cell-h)]',
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
                  <MunTableCell key={cell.id} cell={cell} />
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="*:border-r *:border-border data-[state=selected]:bg-blue-800/25 h-[var(--cell-h)]"
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
                    <MunTableCell cell={cell} key={cell.id} />
                  </SortableContext>
                ))}
              </TableRow>
            ))}
            {table.getBottomRows().map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  '*:border-r *:border-border text-white bg-blue-950 hover:bg-blue-900 h-[var(--cell-h)]',
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
                  <MunTableCell key={cell.id} cell={cell} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MunTableSplitBody;
