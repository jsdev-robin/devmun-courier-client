'use client';

import { Column } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import DebouncedInput from '../../ui/debounced-input';

const ToolbarFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const sortedUniqueValues = useMemo(() => {
    return column.getCanFilter()
      ? {
          id: column.id
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (char) => char.toUpperCase()),
          uniqueValues: Array.from(column.getFacetedUniqueValues().keys()),
        }
      : null;
  }, [column]);

  const columnFilterValue = column.getFilterValue();

  const [open, setOpen] = useState(false);

  return (
    <>
      {column.getCanFilter() ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex whitespace-nowrap items-center gap-2">
            <span className="size-7 inline-flex items-center justify-center rounded-md transition-all hover:bg-card">
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <span>{sortedUniqueValues?.id}</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 pr-0">
              <datalist id={column.id + 'list'}>
                {sortedUniqueValues?.uniqueValues.map(
                  (value: string, i: number) => (
                    <option value={value} key={i} />
                  ),
                )}
              </datalist>
              <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search... (${
                  column.getFacetedUniqueValues().size
                })`}
                list={column.id + 'list'}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </>
  );
};

export default ToolbarFilter;
