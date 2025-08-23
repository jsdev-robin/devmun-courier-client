import React from 'react';

const SplitLoadingSkeleton = () => {
  return (
    <div className="w-full p-4 h-full flex items-center justify-center">
      <h1 className="animate-pulse text-lg font-medium writing-mode-vertical-lr">
        Loading...
      </h1>
    </div>
  );
};

export default SplitLoadingSkeleton;
