'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { GripHorizontal } from 'lucide-react';

const RowDragHandle = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button {...attributes} {...listeners} className="cursor-move">
      <GripHorizontal size={16} />
    </button>
  );
};

export default RowDragHandle;
