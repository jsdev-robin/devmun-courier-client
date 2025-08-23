'use client';

import React from 'react';
import { useDataGrid } from '../contexts/data-grid-contexts';
import MunTableHeader from './mun-table-header';
import MunTableBody from './mun-table-body';

const MunTableMain = () => {
  const { paneRef1, paneRef2 } = useDataGrid();
  return (
    <>
      <div
        className="w-full bg-muted border-b border-border overflow-y-scroll firefox:overflow-x-hidden not-firefox:[&::-webkit-scrollbar]:h-0 firefox:[scrollbar-color:transparent_transparent]"
        ref={paneRef1}
      >
        <MunTableHeader />
      </div>
      <div className="h-[75vh] overflow-scroll bg-background" ref={paneRef2}>
        <MunTableBody />
      </div>
    </>
  );
};

export default MunTableMain;
