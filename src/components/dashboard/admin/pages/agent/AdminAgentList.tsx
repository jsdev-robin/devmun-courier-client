'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import RowDragHandle from '@/components/ui/row-drag-handle';
import RowPin from '@/components/ui/row-pin';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import IndeterminateCheckbox from '@/components/ui/indeterminate-checkbox';
import { buildQueryParams } from '@/lib/buildQueryParams';
import { getSortString } from '@/lib/getSortString';
import { useGetAgentByAdminQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MunTable from '../../../../grid/mun-table';
import { IUser } from '../../../../../lib/features/types/auth';

const AdminAgentList = () => {
  const columns = useMemo<ColumnDef<IUser, unknown>[]>(
    () => [
      {
        accessorFn: (_row, index) => index + 1,
        cell: ({ row }) => row.index + 1,
        id: 'rowNumber',
        header: '',
        size: 54,
        maxSize: 54,
        enableColumnFilter: false,
      },
      {
        id: 'drag-handle',
        cell: ({ row }) => <RowDragHandle rowId={row.id} />,
        size: 36,
      },
      {
        id: 'pin',
        header: () => 'Pin',
        cell: ({ row }) => <RowPin row={row} />,
        size: 60,
        maxSize: 60,
      },
      {
        id: 'actions',
        header: () => (
          <div className="flex items-center justify-between w-[180px]">
            <div>Actions</div>
            <div className="writing-mode-vertical-rl">Block</div>
          </div>
        ),
        cell: () => (
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="size-8">
              <Eye />
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <Edit />
            </Button>
            <Button variant="destructive" size="icon" className="size-8">
              <Trash />
            </Button>
            <Switch />
          </div>
        ),
        size: 200,
        maxSize: 200,
        enableColumnFilter: false,
      },
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        ),
        size: 40,
        maxSize: 40,
        enableColumnFilter: false,
      },
      {
        id: 'familyName',
        accessorKey: 'familyName',
        header: 'First name',
        meta: { filterVariant: 'text' },
        enableHiding: false,
      },
      {
        id: 'givenName',
        accessorKey: 'givenName',
        header: 'Last name',
        meta: { filterVariant: 'text' },
        enableHiding: false,
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
        meta: { filterVariant: 'text' },
      },
      {
        id: 'phone',
        accessorKey: 'phone',
        header: 'Phone',
        meta: { filterVariant: 'text' },
      },
      {
        id: 'address',
        header: 'address',
        columns: [
          {
            id: 'address.addressLine1',
            accessorKey: 'address.addressLine1',
            header: 'Address Line 1',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'address.addressLine2',
            accessorKey: 'address.addressLine2',
            header: 'Address Line 2',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'address.city',
            accessorKey: 'address.city',
            header: 'City',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'address.stateDivision',
            accessorKey: 'address.stateDivision',
            header: 'State Division',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'address.zipCode',
            accessorKey: 'address.zipCode',
            header: 'Zip code',
            meta: { filterVariant: 'text' },
          },
        ],
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const queryParams = buildQueryParams(columnFilters);
  const sort = getSortString(sorting);

  const { data, isError, isLoading, isFetching } = useGetAgentByAdminQuery({
    pagination,
    queryParams,
    sort,
    globalFilter,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle translate="yes">Agent List</CardTitle>
      </CardHeader>
      <CardContent>
        <MunTable
          data={data?.data}
          columns={columns}
          isError={isError}
          isLoading={isLoading || isFetching}
          pagination={pagination}
          setPagination={setPagination}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          sorting={sorting}
          setSorting={setSorting}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </CardContent>
    </Card>
  );
};

export default AdminAgentList;
