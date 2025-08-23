import { ColumnDef } from '@tanstack/react-table';

type GroupedColumnDef<TData> = ColumnDef<TData> & {
  columns?: GroupedColumnDef<TData>[];
};

export const getAllLeafColumnIds = <TData>(
  columns: GroupedColumnDef<TData>[],
): string[] => {
  return columns.flatMap((column) => {
    if (column.columns) {
      return getAllLeafColumnIds(column.columns);
    }
    return column.id ? [column.id] : [];
  });
};
