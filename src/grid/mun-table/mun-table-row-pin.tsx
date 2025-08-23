'use client';

import React from 'react';
import { Row, Table } from '@tanstack/react-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { TableRow } from './mun-table-layout';
import { cn } from '../../lib/utils';
import MunTableCell from './mun-table-cell';

const MunTableRowPinned = <T,>({
  row,
  table,
}: {
  row: Row<T>;
  table: Table<T>;
}) => {
  const { split } = useDataGrid();
  return (
    <TableRow
      className={cn(
        '*:border-r *:border-border text-white bg-blue-950 hover:bg-blue-900',
      )}
      style={{
        position: 'sticky',
        top:
          row.getIsPinned() === 'top'
            ? `calc(${row.getPinnedIndex()} * var(--cell-h))`
            : undefined,
        bottom:
          row.getIsPinned() === 'bottom'
            ? `calc(${
                table.getBottomRows().length - 1 - row.getPinnedIndex()
              } * var(--cell-h))`
            : undefined,
        zIndex: 10,
      }}
    >
      {(split ? row.getCenterVisibleCells() : row.getVisibleCells()).map(
        (cell) => (
          <MunTableCell key={cell.id} cell={cell} />
        ),
      )}
    </TableRow>
  );
};

export default MunTableRowPinned;
