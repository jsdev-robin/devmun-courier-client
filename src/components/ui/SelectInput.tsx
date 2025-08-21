import * as React from 'react';
import { cn } from '../../lib/utils';

type Option = {
  label: string;
  value: string;
};

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

function SelectInput({
  className,
  options,
  value,
  ...props
}: SelectInputProps) {
  return (
    <select
      data-slot="select"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-colors md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      value={value}
      {...props}
    >
      <option value="" disabled hidden>
        Select an option
      </option>
      {options.map((item, i) => (
        <option value={item.value} key={i} className="bg-popover">
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
