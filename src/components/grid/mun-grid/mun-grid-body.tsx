'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunGridTd from './mun-grid-td';
import MunGridError from './mun-grid-error';
import MunGridLoadingSkeleton from './mun-grid-loading-skeleton';
import MunGridNoData from './mun-grid-no-data';
import MunGridRowPinned from './mun-grid-row-pin';
import { FlexTable, Tbody, Tr } from '../../ui/flex-table';

const MunGridBody = () => {
  const { table, columnOrder, cellRef, split, isError, isLoading } =
    useDataGrid();

  return (
    <FlexTable>
      {isError ? (
        <MunGridError />
      ) : isLoading ? (
        <MunGridLoadingSkeleton />
      ) : !isError && !isLoading && table.getRowModel().rows.length === 0 ? (
        <MunGridNoData />
      ) : (
        <Tbody>
          {table.getTopRows().map((row) => (
            <MunGridRowPinned key={row.id} row={row} table={table} />
          ))}

          {table.getRowModel().rows.map((row) => (
            <Tr
              ref={cellRef}
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
            >
              {(split ? row.getCenterVisibleCells() : row.getVisibleCells())
                .filter((cell) => !['rowNumber'].includes(cell.column.id))
                .map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder || []}
                    strategy={horizontalListSortingStrategy}
                  >
                    <MunGridTd key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
            </Tr>
          ))}
          {table.getBottomRows().map((row) => (
            <MunGridRowPinned key={row.id} row={row} table={table} />
          ))}
        </Tbody>
      )}
    </FlexTable>
  );
};

export default MunGridBody;
