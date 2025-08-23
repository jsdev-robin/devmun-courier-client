'use client';

import { FlexTable, Tbody, Td, Thead, Tr } from '../../ui/flex-table';
import { Skeleton } from '../../ui/skeleton';
import { flexRender } from '@tanstack/react-table';
import MunGridTh from './mun-grid-th';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunGridTd from './mun-grid-td';

const MunGridRowNumber = () => {
  const { table, paneRef3, isLoading } = useDataGrid();

  return (
    <div className="bg-muted border-r border-border">
      <div className="border-b border-border">
        <FlexTable>
          <Thead className="[&_div]:border-b-0">
            <Tr className="opacity-0 pointer-events-none select-none">
              {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers
                    .filter((header) =>
                      ['rowNumber'].includes(header.column.id),
                    )
                    .map((header) => (
                      <MunGridTh key={header.id} header={header} />
                    )),
                )}
            </Tr>
          </Thead>
        </FlexTable>
      </div>
      <div
        className="h-[75svh] lg:h-[75vh] overflow-y-hidden overflow-x-scroll [scrollbar-color:transparent_transparent]"
        ref={paneRef3}
      >
        {isLoading ? (
          <FlexTable>
            <Tbody>
              {Array.from({ length: 30 }).map((_, index) => (
                <Tr key={`skeleton-${index}`} className="h-10">
                  <Td className="text-right">
                    <Skeleton className="h-4 w-8 ml-auto bg-card" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </FlexTable>
        ) : (
          <FlexTable>
            <Tbody>
              {table.getTopRows().map((row) => {
                const rowNumberCell = row
                  .getAllCells()
                  .find((cell) => ['rowNumber'].includes(cell.column.id));

                return rowNumberCell ? (
                  <Tr
                    key={row.id}
                    className="h-10 flex items-center justify-end bg-blue-900 hover:bg-blue-950"
                    style={{
                      position: 'sticky',
                      top:
                        row.getIsPinned() === 'top'
                          ? `calc(${row.getPinnedIndex()} * var(--cell-h))`
                          : undefined,
                      zIndex: 10,
                    }}
                  >
                    <Td>
                      {flexRender(
                        rowNumberCell.column.columnDef.cell,
                        rowNumberCell.getContext(),
                      )}
                    </Td>
                  </Tr>
                ) : null;
              })}
              {table.getRowModel().rows.map((row) => {
                return (
                  <Tr
                    key={row.id}
                    className="h-10 [&_div]:justify-end [&_div]:h-full"
                  >
                    {row
                      .getVisibleCells()
                      .filter((cell) => ['rowNumber'].includes(cell.column.id))
                      .map((cell) => (
                        <MunGridTd
                          key={cell.id}
                          cell={cell}
                          className="text-right"
                        />
                      ))}
                  </Tr>
                );
              })}
              {table.getBottomRows().map((row) => {
                const rowNumberCell = row
                  .getAllCells()
                  .find((cell) => ['rowNumber'].includes(cell.column.id));

                return rowNumberCell ? (
                  <Tr
                    key={row.id}
                    className="h-10 flex items-center justify-end bg-blue-900 hover:bg-blue-950"
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
                    <Td>
                      {flexRender(
                        rowNumberCell.column.columnDef.cell,
                        rowNumberCell.getContext(),
                      )}
                    </Td>
                  </Tr>
                ) : null;
              })}
            </Tbody>
          </FlexTable>
        )}
      </div>
    </div>
  );
};

export default MunGridRowNumber;
