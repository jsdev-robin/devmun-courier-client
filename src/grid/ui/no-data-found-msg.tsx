import React from 'react';
import PlaceHolderIcon from '../icons/PlaceHolderIcon';

const NoDataFoundMsg = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-transparent">
      <div className="text-center text-muted-foreground space-y-6">
        <PlaceHolderIcon />
        <h1 className="text-3xl font-bold">No data found</h1>
      </div>
    </div>
  );
};

export default NoDataFoundMsg;
