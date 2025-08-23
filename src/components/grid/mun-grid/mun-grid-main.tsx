'use client';

import React from 'react';
import MunGridHead from './mun-grid-head';
import MunGridBody from './mun-grid-body';
import { useDataGrid } from '../contexts/data-grid-contexts';

const MunGridMain = () => {
  const { paneRef1, paneRef2 } = useDataGrid();

  return (
    <React.Fragment>
      <div
        className="w-full bg-muted border-b border-border overflow-y-scroll firefox:overflow-x-hidden not-firefox:[&::-webkit-scrollbar]:h-0 firefox:[scrollbar-color:transparent_transparent]"
        ref={paneRef1}
      >
        <MunGridHead />
      </div>
      <div
        className="h-[75svh] lg:h-[75vh] overflow-scroll bg-background"
        ref={paneRef2}
      >
        <MunGridBody />
      </div>
    </React.Fragment>
  );
};

export default MunGridMain;
