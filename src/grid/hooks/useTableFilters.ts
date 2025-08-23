import { useState } from "react";
import { ColumnFiltersState, PaginationState } from "@tanstack/react-table";

export function useTableFilters(defaultPageSize = 20) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  return {
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
  };
}
