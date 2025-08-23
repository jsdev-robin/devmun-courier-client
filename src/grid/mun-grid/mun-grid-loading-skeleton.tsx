import React, { useMemo } from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Tbody, Td, Tr } from '../../components/ui/flex-table';
import { getPinStyles } from '../utils/getPinStyles';
import RowLoadingSkeleton from '../ui/row-loading-skeleton';

const GridLoadingSkeleton = () => {
  const { table, split } = useDataGrid();

  const visibleColumns = useMemo(
    () =>
      (split ? table.getCenterHeaderGroups() : table.getHeaderGroups()).flatMap(
        (group) =>
          group.headers
            .filter(
              (header) =>
                !header.isPlaceholder &&
                !header.subHeaders?.length &&
                header.column.id !== 'rowNumber',
            )
            .map((header) => header.column),
      ),
    [table, split],
  );

  return (
    <Tbody>
      {[...Array(20)].map((_, i) => (
        <Tr key={i} className="*:border-r *:border-border h-10">
          {visibleColumns.map((column, j) => (
            <Td
              key={j}
              style={{
                width: column.getSize(),
                minWidth: column.getSize(),
                maxWidth: ['select', 'actions', 'pin', 'drag-handle'].includes(
                  column.id,
                )
                  ? column.getSize()
                  : undefined,
                flex: ['select', 'actions', 'pin', 'drag-handle'].includes(
                  column.id,
                )
                  ? undefined
                  : 1,
                ...(!split && getPinStyles(column)),
              }}
            >
              <RowLoadingSkeleton column={column} i={i} j={j} />
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default GridLoadingSkeleton;
