import React, { useMemo } from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Table, TableBody, TableCell, TableRow } from './mun-table-layout';
import { getPinStyles } from '../utils/getPinStyles';
import RowLoadingSkeleton from '../ui/row-loading-skeleton';

const MunTableLoadingSkeleton = () => {
  const { table, split } = useDataGrid();

  const visibleColumns = useMemo(
    () =>
      (split ? table.getCenterHeaderGroups() : table.getHeaderGroups())
        .map((group) =>
          group.headers
            .filter(
              (header) => !header.isPlaceholder && !header.subHeaders?.length,
            )
            .map((header) => header.column),
        )
        .flat(),
    [table, split],
  );

  return (
    <Table>
      <TableBody>
        {[...Array(20)].map((_, i) => (
          <TableRow key={i} className="*:border-r *:border-border">
            {visibleColumns.map((column, j) => (
              <TableCell
                key={j}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                  ...(!split && getPinStyles(column)),
                }}
              >
                <RowLoadingSkeleton column={column} i={i} j={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MunTableLoadingSkeleton;
