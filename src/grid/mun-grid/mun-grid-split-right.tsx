'use client';

import React from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunGridSplitThead from './mun-grid-split-thead';
import MunGridSplitTbody from './mun-grid-split-tbody';

const MunGridSplitRight = () => {
  const { split, isError, table } = useDataGrid();

  return split &&
    !isError &&
    table.getAllLeafColumns().some((col) => col.getIsPinned() === 'right') ? (
    <div className="overflow-hidden max-w-1/4 border-l border-blue-800">
      <MunGridSplitThead direction="right" />

      <MunGridSplitTbody direction="right" />
    </div>
  ) : null;
};

export default MunGridSplitRight;
