'use client';

import React from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunGridSplitThead from './mun-grid-split-thead';
import MunGridSplitTbody from './mun-grid-split-tbody';

const MunGridSplitLeft = () => {
  const { split, isError, table } = useDataGrid();

  return split &&
    !isError &&
    table.getAllLeafColumns().some((col) => col.getIsPinned() === 'left') ? (
    <div className="overflow-hidden max-w-1/4 border-r border-blue-800">
      <MunGridSplitThead direction="left" />
      <MunGridSplitTbody direction="left" />
    </div>
  ) : null;
};

export default MunGridSplitLeft;
