import React, { memo } from 'react';
import ErrorMsg from '../ui/error-msg';

const MunTableError = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <ErrorMsg />
    </div>
  );
};

export default memo(MunTableError);
