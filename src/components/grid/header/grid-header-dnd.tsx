'use client';

import React from 'react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Header } from '@tanstack/react-table';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Button } from '../../ui/button';

interface DndIndicatorProps<T> {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
  header: Header<T, unknown>;
}

const GridHeaderDnd = <T,>({
  attributes,
  listeners,
  header,
}: DndIndicatorProps<T>) => {
  const { isError, isLoading } = useDataGrid();

  return header.column.getCanFilter() ? (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full cursor-pointer size-6 ml-auto hover:bg-card opacity-0 group-hover:opacity-100 touch:opacity-100"
      disabled={isError || isLoading}
      {...attributes}
      {...listeners}
    >
      <DragHandleDots2Icon />
    </Button>
  ) : null;
};

export default GridHeaderDnd;
