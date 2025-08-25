'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { Parcel } from '@/lib/features/types/parcel';
import RowDragHandle from '@/components/ui/row-drag-handle';
import RowPin from '@/components/ui/row-pin';
import { Button } from '@/components/ui/button';
import { Eye, File, FileText, ScrollText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import IndeterminateCheckbox from '@/components/ui/indeterminate-checkbox';
import { buildQueryParams } from '@/lib/buildQueryParams';
import { getSortString } from '@/lib/getSortString';
import { useGetParcelByAdminQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MunTable from '../../../../grid/mun-table';
import Image from 'next/image';
import { useFileDownload } from '../../../../../hooks/useFileDownload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

const AdminParcelList = () => {
  const { downloadFile } = useFileDownload();

  const handleExportInvoice = useCallback(
    (id: string) => {
      downloadFile({
        url:
          process.env.NODE_ENV === 'production'
            ? `https://api.devmun.xyz/api/v1/admin/parcel/export/invoice/${id}`
            : `http://localhost:8080/api/v1/admin/parcel/export/invoice/${id}`,
        fileName: 'parcel.pdf',
        fileType: 'application/pdf',
      });
    },
    [downloadFile],
  );

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
        header: 'Pin',
        cell: ({ row }) => <RowPin row={row} />,
        size: 60,
        maxSize: 60,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handleExportInvoice(row?.original._id)}
            >
              <ScrollText />
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <Eye />
            </Button>

            <Switch />
          </div>
        ),
        size: 150,
        maxSize: 150,
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
        header: 'Tracking ID',
        accessorKey: 'trackingId',
        enableColumnFilter: true,
        meta: { filterVariant: 'text' },
        enableHiding: false,
      },
      {
        id: 'parcelInfo',
        header: 'Parcel Info',
        columns: [
          {
            id: 'parcelSize',
            header: 'Size',
            accessorKey: 'parcelSize',
            meta: { filterVariant: 'select' },
          },
          {
            id: 'parcelType',
            header: 'Type',
            accessorKey: 'parcelType',
            meta: { filterVariant: 'select' },
          },
          {
            id: 'paymentMethod',
            header: 'Payment Method',
            accessorKey: 'paymentMethod',
            meta: { filterVariant: 'select' },
          },
          {
            id: 'codAmount',
            header: 'COD Amount',
            accessorKey: 'codAmount',
            meta: { filterVariant: 'range' },
          },
          {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            meta: { filterVariant: 'select' },
          },
          { id: 'priority', header: 'Priority', accessorKey: 'priority' },
          {
            id: 'pickupAddress',
            header: 'Pickup Address',
            accessorKey: 'pickupAddress',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'deliveryAddress',
            header: 'Delivery Address',
            accessorKey: 'deliveryAddress',
            meta: { filterVariant: 'text' },
          },
          {
            id: 'pickupLocation',
            header: 'Pickup Location',
            columns: [
              {
                id: 'pickupLocation.lat',
                header: 'Lat',
                accessorFn: (row) => row.pickupLocation?.lat,
              },
              {
                id: 'pickupLocation.lng',
                header: 'Lng',
                accessorFn: (row) => row.pickupLocation?.lng,
              },
            ],
          },
          { id: 'notes', header: 'Notes', accessorKey: 'notes' },
        ],
      },
      {
        id: 'customerInfo',
        header: 'Customer Info',
        columns: [
          {
            id: 'customer.familyName',
            header: 'Family Name',
            accessorFn: (row) => row.customer.familyName,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'customer.givenName',
            header: 'Given Name',
            accessorFn: (row) => row.customer.givenName,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'customer.email',
            header: 'Email',
            accessorFn: (row) => row.customer.email,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'customer.phone',
            header: 'Phone',
            accessorFn: (row) => row.customer.phone,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'customer.address',
            header: 'Address',
            columns: [
              {
                id: 'customer.address.addressLine1',
                header: 'Line 1',
                accessorFn: (row) => row.customer.address?.addressLine1,
              },
              {
                id: 'customer.address.addressLine2',
                header: 'Line 2',
                accessorFn: (row) => row.customer.address?.addressLine2,
              },
              {
                id: 'customer.address.city',
                header: 'City',
                accessorFn: (row) => row.customer.address?.city,
              },
              {
                id: 'customer.address.stateDivision',
                header: 'State/Division',
                accessorFn: (row) => row.customer.address?.stateDivision,
              },
              {
                id: 'customer.address.zipCode',
                header: 'Zip Code',
                accessorFn: (row) => row.customer.address?.zipCode,
              },
              {
                id: 'customer.address.landmark',
                header: 'Landmark',
                accessorFn: (row) => row.customer.address?.landmark,
              },
              {
                id: 'customer.address.location',
                header: 'Location',
                columns: [
                  {
                    id: 'customer.address.location.lat',
                    header: 'Lat',
                    accessorFn: (row) => row.customer.address?.location?.lat,
                  },
                  {
                    id: 'customer.address.location.lng',
                    header: 'Lng',
                    accessorFn: (row) => row.customer.address?.location?.lng,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'receiverInfo',
        header: 'Receiver Info',
        columns: [
          { id: 'receiverName', header: 'Name', accessorKey: 'receiverName' },
          {
            id: 'receiverPhone',
            header: 'Phone',
            accessorKey: 'receiverPhone',
          },
        ],
      },
      {
        id: 'agentInfo',
        header: 'Agent Info',
        columns: [
          {
            id: 'agent',
            header: 'Agent',
            cell: ({ row }) => (
              <div className="flex items-center gap-2">
                <Image
                  src={row.original.agent.avatar?.url}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <span>
                  {row.original.agent.familyName} {row.original.agent.givenName}
                </span>
              </div>
            ),
          },
          {
            id: 'agent.email',
            header: 'Email',
            accessorFn: (row) => row.agent.email,
          },
          {
            id: 'agent.phone',
            header: 'Phone',
            accessorFn: (row) => row.agent.phone,
          },
          {
            id: 'agent.address',
            header: 'Address',
            columns: [
              {
                id: 'agent.address.addressLine1',
                header: 'Line 1',
                accessorFn: (row) => row.agent.address?.addressLine1,
              },
              {
                id: 'agent.address.city',
                header: 'City',
                accessorFn: (row) => row.agent.address?.city,
              },
              {
                id: 'agent.address.stateDivision',
                header: 'State/Division',
                accessorFn: (row) => row.agent.address?.stateDivision,
              },
              {
                id: 'agent.address.zipCode',
                header: 'Zip Code',
                accessorFn: (row) => row.agent.address?.zipCode,
              },
              {
                id: 'agent.address.landmark',
                header: 'Landmark',
                accessorFn: (row) => row.agent.address?.landmark,
              },
            ],
          },
        ],
      },
      {
        id: 'timestamps',
        header: 'Timestamps',
        columns: [
          {
            id: 'createdAt',
            header: 'Created At',
            accessorKey: 'createdAt',
            meta: { filterVariant: 'dateRange' },
          },
          {
            id: 'updatedAt',
            header: 'Updated At',
            accessorKey: 'updatedAt',
            meta: { filterVariant: 'dateRange' },
          },
        ],
      },
    ],
    [handleExportInvoice],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const queryParams = buildQueryParams(columnFilters);
  const sort = getSortString(sorting);

  const { data, isError, isLoading, isFetching } = useGetParcelByAdminQuery({
    pagination,
    queryParams,
    sort,
    globalFilter,
  });

  const handleExportExcel = () => {
    downloadFile({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://api.devmun.xyz/api/v1/admin/parcel/export/csv'
          : 'http://localhost:8080/api/v1/admin/parcel/export/csv',
      fileName: 'parcels.xlsx',
      fileType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  };

  const handleExportPDF = () => {
    downloadFile({
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://api.devmun.xyz/api/v1/admin/parcel/export/pdf'
          : 'http://localhost:8080/api/v1/admin/parcel/export/pdf',
      fileName: 'parcels.pdf',
      fileType: 'application/pdf',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle translate="yes">Parcel List</CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <QrCode />
                  Scan QR Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Parcel QR Scanner</DialogTitle>
                  <DialogDescription>
                    Scan parcel QR codes instantly to view details.
                  </DialogDescription>
                </DialogHeader>
                <Scanner
                  onScan={(results) => {
                    if (results.length > 0) {
                      setGlobalFilter(results[0].rawValue);
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline" onClick={handleExportExcel}>
              <File />
              Export CSV
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportPDF}>
              <FileText />
              Export PDF
            </Button>
          </div>
        </CardAction>
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
