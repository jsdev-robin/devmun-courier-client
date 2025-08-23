'use client';

import React from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunTableSplitHeader from './mun-table-split-thead';
import MunTableSplitBody from './mun-table-split-tbody';

const MunTableSplitLeft = () => {
  const { split, isError, table } = useDataGrid();

  return split &&
    !isError &&
    table.getAllLeafColumns().some((col) => col.getIsPinned() === 'left') ? (
    <div className="overflow-hidden max-w-1/4 border-r border-blue-800">
      <MunTableSplitHeader direction="left" />
      <MunTableSplitBody direction="left" />
    </div>
  ) : null;
};

export default MunTableSplitLeft;
