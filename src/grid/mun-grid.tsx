'use client';

import { DataGridProvider } from './contexts/data-grid-contexts';
import ColumnDnd from './contexts/data-grid-column-dnd';
import MunGridMain from './mun-grid/mun-grid-main';
import MunGridRowNumber from './mun-grid/mun-grid-row-number';
import Toolbar from './toolbar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Pagination from './pagination';
import { GridProps } from './types/grid-types';
import { useBreakpoint } from './hooks/use-breakpoint';
import {
  Fingerprint,
  FolderUp,
  Import,
  Printer,
  Sheet,
  Table,
  Upload,
} from 'lucide-react';
import FilterByBarcode from './features/barcode-scan';
import { Button } from '../components/ui/button';

const MunGridSplitLeft = dynamic(
  () => import('./mun-grid/mun-grid-split-left'),
  {
    ssr: false,
  },
);
const MunGridSplitRight = dynamic(
  () => import('./mun-grid/mun-grid-split-right'),
  { ssr: false },
);

const MunGrid = <T,>({
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
          <div className="hidden items-center gap-3 justify-between overflow-hidden xl:flex">
            <FilterByBarcode />
            <Button size="sm" variant="outline">
              <FolderUp />
              Export CSV
            </Button>
            <Button size="sm" variant="outline">
              <FolderUp />
              Export PDF
            </Button>
            <Button size="sm" variant="outline">
              <Fingerprint />
              Secure Data
            </Button>
            <Button size="sm" variant="outline">
              <Import />
              Import File
            </Button>
            <Button size="sm" variant="outline">
              <Sheet />
              Google Sheets
            </Button>
            <Button size="sm" variant="outline">
              <Upload />
              Upload File
            </Button>
            <Button size="sm" variant="outline">
              <Printer />
              Print
            </Button>
            <Button
              size="sm"
              variant="outline"
              title="Reset table settings to default"
            >
              <Table />
              Reset Table
            </Button>
          </div>
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            <Suspense>
              <MunGridSplitLeft />
            </Suspense>
            {sm && <MunGridRowNumber />}
            <div className="overflow-hidden flex-1">
              <MunGridMain />
            </div>
            <Suspense>
              <MunGridSplitRight />
            </Suspense>
            {toolbar.active && sm && <Toolbar open={toolbar.open} />}
          </div>
          <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunGrid;
