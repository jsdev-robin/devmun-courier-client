'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Table, TableHeader, TableRow } from './mun-table-layout';
import MunTableHead from './mun-table-head';

const MunTableHeader = () => {
  const { table, columnOrder, split, headerRef } = useDataGrid();
  return (
    <Table ref={headerRef}>
      <TableHeader>
        {(split ? table.getCenterHeaderGroups() : table.getHeaderGroups()).map(
          (headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="*:border-r *:border-border"
            >
              <SortableContext
                items={columnOrder || []}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <MunTableHead key={header.id} header={header} />
                ))}
              </SortableContext>
            </TableRow>
          ),
        )}
      </TableHeader>
    </Table>
  );
};

export default MunTableHeader;
