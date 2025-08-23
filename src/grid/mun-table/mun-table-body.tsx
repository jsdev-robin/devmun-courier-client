'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Table, TableBody, TableRow } from './mun-table-layout';
import MunTableCell from './mun-table-cell';
import MunTableLoadingSkeleton from './mun-table-loading-skeleton';
import MunTableError from './mun-table-error';
import MunTableNoData from './mun-table-no-data';
import MunTableRowPinned from './mun-table-row-pin';

const MunTableBody = () => {
  const { table, columnOrder, isError, isLoading, split, cellRef } =
    useDataGrid();

  return (
    <>
      {isError ? (
        <MunTableError />
      ) : isLoading ? (
        <MunTableLoadingSkeleton />
      ) : !isError && !isLoading && table.getRowModel().rows.length === 0 ? (
        <MunTableNoData />
      ) : (
        <Table>
          <TableBody>
            {table.getTopRows().map((row) => (
              <MunTableRowPinned key={row.id} row={row} table={table} />
            ))}
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  ref={cellRef}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="*:border-r *:border-border data-[state=selected]:bg-blue-800/25"
                >
                  {(split
                    ? row.getCenterVisibleCells()
                    : row.getVisibleCells()
                  ).map((cell) => (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder || []}
                      strategy={horizontalListSortingStrategy}
                    >
                      <MunTableCell key={cell.id} cell={cell} />
                    </SortableContext>
                  ))}
                </TableRow>
              );
            })}
            {table.getBottomRows().map((row) => (
              <MunTableRowPinned key={row.id} row={row} table={table} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default MunTableBody;
