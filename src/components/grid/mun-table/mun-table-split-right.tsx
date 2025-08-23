'use client';

import React from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunTableSplitHeader from './mun-table-split-thead';
import MunTableSplitBody from './mun-table-split-tbody';

const MunTableSplitRight = () => {
  const { split, isError, table } = useDataGrid();

  return split &&
    !isError &&
    table.getAllLeafColumns().some((col) => col.getIsPinned() === 'right') ? (
    <div className="overflow-hidden max-w-1/4 border-l border-blue-800">
      <MunTableSplitHeader direction="right" />
      <MunTableSplitBody direction="right" />
    </div>
  ) : null;
};

export default MunTableSplitRight;
