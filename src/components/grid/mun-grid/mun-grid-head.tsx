'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { FlexTable, Thead, Tr } from '../../ui/flex-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunGridTh from './mun-grid-th';

const MunGridHead = () => {
  const { table, columnOrder, headerRef, split } = useDataGrid();

  return (
    <FlexTable ref={headerRef}>
      <Thead>
        {(split ? table.getCenterHeaderGroups() : table.getHeaderGroups()).map(
          (headerGroup) => (
            <Tr key={headerGroup.id} className="*:border-r *:border-border">
              <SortableContext
                items={columnOrder || []}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers
                  .filter((header) => !['rowNumber'].includes(header.column.id))
                  .map((header) => (
                    <MunGridTh key={header.id} header={header} />
                  ))}
              </SortableContext>
            </Tr>
          ),
        )}
      </Thead>
    </FlexTable>
  );
};

export default MunGridHead;
