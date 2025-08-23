import React from 'react';
import { Row } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, X } from 'lucide-react';

const RowPin = <T,>({ row }: { row: Row<T> }) => {
  return row.getIsPinned() ? (
    <button
      title="Unpin"
      className="text-red-500"
      onClick={() => row.pin(false)}
    >
      <X size={16} />
    </button>
  ) : (
    <div className="flex gap-2">
      <button title="Pin row top" onClick={() => row.pin('top')}>
        <ArrowUp size={16} />
      </button>
      <button title="Pin row bottom" onClick={() => row.pin('bottom')}>
        <ArrowDown size={16} />
      </button>
    </div>
  );
};

export default RowPin;
