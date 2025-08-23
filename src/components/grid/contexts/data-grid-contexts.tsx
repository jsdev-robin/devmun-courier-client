/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  PaginationState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import useSyncScroll from '../hooks/useSyncScroll';
import { useElementDimensions } from '../hooks/useElementDimensions';
import { SortingState } from '@tanstack/react-table';
import { getAllLeafColumnIds } from '../utils/getAllLeafColumnIds';

interface DataGridContexttValue<T> {
  table: Table<T>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading?: boolean;
  isError?: boolean;

  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  paneRef7: React.RefObject<HTMLDivElement | null>;
  headerRef: (node: HTMLElement | null) => void;
  cellRef: (node: HTMLElement | null) => void;
  split: boolean;
  setSplit: React.Dispatch<React.SetStateAction<boolean>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const DataGridContextt = createContext<DataGridContexttValue<any> | null>(null);

interface DataGridProviderProps<T> {
  children: React.ReactNode;
  data?: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  columns: ColumnDef<T>[];
  isLoading: boolean;
  isError: boolean;
  isSplit?: boolean;
  pin?: ColumnPinningState;
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
}

export const DataGridProvider = <T,>({
  children,
  data,
  columns,
  isLoading,
  isError,
  isSplit = false,
  pin = {},
  pagination = {
    pageIndex: 0,
    pageSize: 20,
  },
  setPagination,
  columnFilters,
  setColumnFilters,
  sorting,
  setSorting,
  globalFilter,
  setGlobalFilter,
}: DataGridProviderProps<T>) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    getAllLeafColumnIds(columns),
  );
  const [rowSelection, setRowSelection] = useState({});

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    pin: false,
    'drag-handle': false,
  });

  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(pin);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    columnResizeMode: 'onChange',
    enableRowSelection: true,
    manualPagination: true,
    rowCount: data?.total,
    state: {
      columnFilters,
      globalFilter,
      columnOrder,
      rowSelection,
      pagination,
      columnVisibility,
      columnPinning,
      sorting,
    },
    defaultColumn: {
      minSize: 180,
    },
  });

  const [split, setSplit] = useState<boolean>(isSplit);

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const paneRef7 = useRef<HTMLDivElement>(null);
  const { ref: cellRef } = useElementDimensions({ h: '--cell-h' });
  const { ref: headerRef } = useElementDimensions({ h: '--header-h' });

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef4, paneRef6],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef5, paneRef7],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef2, paneRef3, paneRef6, paneRef7],
    axis: 'y',
  });

  const contextValue = useMemo(
    () => ({
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
      cellRef,
      headerRef,
      split,
      setSplit,
      globalFilter,
      setGlobalFilter,
    }),
    [
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
      cellRef,
      headerRef,
      split,
      setSplit,
      globalFilter,
      setGlobalFilter,
    ],
  );

  return (
    <DataGridContextt.Provider
      value={{
        ...contextValue,
        table,
      }}
    >
      {children}
    </DataGridContextt.Provider>
  );
};

export function useDataGrid() {
  const context = useContext(
    DataGridContextt as React.Context<DataGridContexttValue<any> | null>,
  );

  if (!context) {
    throw new Error('useDataGrid must be used within a DataGridProvider');
  }
  return context;
}

export default DataGridContextt;
