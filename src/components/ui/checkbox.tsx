import * as React from 'react';
import { cn } from '../../lib/utils';

function Checkbox({
  className,
  checked,
  ...props
}: React.ComponentProps<'input'> & { checked?: boolean }) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      checked={checked}
      className={cn(
        'border border-input rounded disabled:opacity-50 disabled:pointer-events-none bg-background focus:ring-offset-background focus:ring-primary checked:bg-primary checked:border-primary checked:dark:focus:ring-blue-500  checked:dark:border-blue-500 checked:dark:bg-blue-700',
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
