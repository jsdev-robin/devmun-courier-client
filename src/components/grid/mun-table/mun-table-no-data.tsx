import React, { memo, useMemo } from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Table, TableBody, TableCell, TableRow } from './mun-table-layout';
import NoDataFoundMsg from '../ui/no-data-found-msg';

const MunTableNoData = () => {
  const { table } = useDataGrid();
  const visibleColumns = useMemo(() => table.getAllLeafColumns(), [table]);

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {visibleColumns.map((column, i) => (
              <TableCell
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <NoDataFoundMsg />
    </>
  );
};

export default memo(MunTableNoData);
