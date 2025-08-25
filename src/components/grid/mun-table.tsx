'use client';

import { DataGridProvider } from './contexts/data-grid-contexts';
import ColumnDnd from './contexts/data-grid-column-dnd';
import Toolbar from './toolbar';
import { Suspense } from 'react';
import Pagination from './pagination';
import MunTableMain from './mun-table/mun-table-main';
import dynamic from 'next/dynamic';
import { GridProps } from './types/grid-types';
import { useBreakpoint } from './hooks/use-breakpoint';

const MunTableSplitLeft = dynamic(
  () => import('./mun-table/mun-table-split-left'),
  {
    ssr: false,
  },
);
const MunTableSplitRight = dynamic(
  () => import('./mun-table/mun-table-split-right'),
  { ssr: false },
);

const MunTable = <T,>({
  data,
  columns,
  isError,
  isLoading,
  toolbar = {
    active: true,
    open: null,
  },
  isSplit,
  pin,
  pagination,
  setPagination,
  columnFilters,
  setColumnFilters,
  sorting,
  setSorting,
  globalFilter,
  setGlobalFilter,
}: GridProps<T>) => {
  const sm = !useBreakpoint('sm');
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      isSplit={isSplit}
      pin={pin}
      pagination={pagination}
      setPagination={setPagination}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      sorting={sorting}
      setSorting={setSorting}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    >
      <ColumnDnd>
        <div className="space-y-3 relative">
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            <Suspense>
              <MunTableSplitLeft />
            </Suspense>
            <div className="overflow-hidden flex-1">
              <MunTableMain />
            </div>
            <Suspense>
              <MunTableSplitRight />
            </Suspense>
            {toolbar.active && sm && <Toolbar open={toolbar.open} />}
          </div>
          <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunTable;
