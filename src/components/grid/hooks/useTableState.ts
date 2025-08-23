"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { getSortedRowModel } from "@tanstack/react-table";

interface TableStateProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  rowCount?: number | undefined;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  defaultPinnedColumns?: ColumnPinningState;
  defaultHiddenColumns?: VisibilityState;
}

export const useTableState = <T>({
  columns,
  data,
  rowCount,
  columnFilters,
  setColumnFilters,
  pagination,
  setPagination,
  defaultPinnedColumns = {},
  defaultHiddenColumns = { pin: false, "drag-handle": false },
}: TableStateProps<T>) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultHiddenColumns);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnPinning, setColumnPinning] =
    useState<ColumnPinningState>(defaultPinnedColumns);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    manualPagination: true,
    rowCount: rowCount,
    state: {
      columnFilters,
      globalFilter,
      columnOrder,
      columnVisibility,
      pagination,
      rowSelection,
      columnPinning,
    },
  });

  return {
    table,
    columnOrder,
    setColumnOrder,
    globalFilter,
    setGlobalFilter,
    columnFilters,
  };
};
