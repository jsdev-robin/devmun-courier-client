'use client';

import React, { HTMLProps, useEffect } from 'react';
import { Checkbox } from './checkbox';

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <Checkbox ref={ref} className={className + ' cursor-pointer'} {...rest} />
  );
};

export default IndeterminateCheckbox;
