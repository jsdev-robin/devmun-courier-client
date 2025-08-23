'use client';

import React from 'react';
import { Row, Table } from '@tanstack/react-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Tr } from '../../ui/flex-table';
import { cn } from '../../../lib/utils';
import MunGridTd from './mun-grid-td';

const MunGridRowPinned = <T,>({
  row,
  table,
}: {
  row: Row<T>;
  table: Table<T>;
}) => {
  const { split } = useDataGrid();
  return (
    <Tr
      className={cn(
        '*:border-r *:border-border h-10 [&_div]:h-full text-white bg-blue-950 hover:bg-blue-900 sticky',
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
      {(split ? row.getCenterVisibleCells() : row.getVisibleCells())
        .filter((cell) => !['rowNumber'].includes(cell.column.id))
        .map((cell) => (
          <MunGridTd key={cell.id} cell={cell} />
        ))}
    </Tr>
  );
};

export default MunGridRowPinned;
