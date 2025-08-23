'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { Parcel } from '@/lib/features/types/parcel';
import RowDragHandle from '@/components/ui/row-drag-handle';
import RowPin from '@/components/ui/row-pin';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import IndeterminateCheckbox from '@/components/ui/indeterminate-checkbox';
import { buildQueryParams } from '@/lib/buildQueryParams';
import { getSortString } from '@/lib/getSortString';
import { useGetParcelByAdminQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MunTable from '../../../../grid/mun-table';

const AdminParcelList = () => {
  const columns = useMemo<ColumnDef<Parcel, unknown>[]>(
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
            <div className="writing-mode-vertical-rl">Online</div>
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
        id: 'trackingId',
        accessorKey: 'trackingId',
        header: 'Tracking ID',
        meta: { filterVariant: 'text' },
        enableHiding: false,
      },
      {
        id: 'customer',
        header: 'customer Info',
        columns: [
          {
            id: 'customerName',
            header: 'Full Name',
            accessorFn: (row) =>
              `${row.customer.familyName} ${row.customer.givenName}`,
          },
          {
            id: 'customerContact',
            header: 'Phone / Email',
            accessorFn: (row) => row.customer,
            cell: ({ row }) => {
              const customer = row.original.customer;
              return (
                <div className="flex flex-col">
                  <a
                    href={`tel:${customer.phone}`}
                    className="text-blue-600 underline"
                  >
                    {customer.phone}
                  </a>
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-blue-600 underline"
                  >
                    {customer.email}
                  </a>
                </div>
              );
            },
          },
          {
            id: 'customerAddress',
            header: 'Address',
            accessorFn: (row) => row.customer,
            cell: ({ row }) => {
              const customer = row.original.customer;
              return (
                <div className="flex flex-col">
                  <span>
                    <strong>City:</strong> {customer.address?.city}
                  </span>
                  <span>
                    <strong>State Division:</strong>{' '}
                    {customer.address?.stateDivision}
                  </span>
                  <span>
                    <strong>Zip Code:</strong> {customer.address?.zipCode}
                  </span>
                </div>
              );
            },
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

  const { data, isError, isLoading, isFetching } = useGetParcelByAdminQuery({
    pagination,
    queryParams,
    sort,
    globalFilter,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle translate="yes">Product List</CardTitle>
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

export default AdminParcelList;
