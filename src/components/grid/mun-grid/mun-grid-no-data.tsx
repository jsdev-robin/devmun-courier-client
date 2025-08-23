import React, { memo, useMemo } from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { FlexTable, Tbody, Td, Tr } from '../../ui/flex-table';
import NoDataFoundMsg from '../ui/no-data-found-msg';

const MunGridNoData = () => {
  const { table } = useDataGrid();
  const visibleColumns = useMemo(() => table.getAllLeafColumns(), [table]);

  return (
    <>
      <FlexTable>
        <Tbody>
          <Tr>
            {visibleColumns.map((column, i) => (
              <Td
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </Tr>
        </Tbody>
      </FlexTable>
      <NoDataFoundMsg />
    </>
  );
};

export default memo(MunGridNoData);
