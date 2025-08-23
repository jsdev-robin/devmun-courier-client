'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle,
  Columns,
  EyeOff,
  Filter,
  ListRestart,
  MoveRight,
  PinOff,
  Settings,
  Shuffle,
  StretchHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { useDataGrid } from '../contexts/data-grid-contexts';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import ToolbarFilter from './toolbar-filter';
import DebouncedInput from '../../components/ui/debounced-input';

interface ToolbarProps {
  open?: 'columns' | 'toolbar' | 'filter' | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ open }) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table, split, setSplit, globalFilter, setGlobalFilter } =
    useDataGrid();

  useEffect(() => {
    if (open) {
      setActivePanel(open);
    }
  }, [open]);

  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter(
        (column) => !['rowNumber', 'pin', 'drag-handle'].includes(column.id),
      )
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  return (
    <div className="bg-muted overflow-hidden hidden sm:flex">
      {activePanel === 'columns' && (
        <div className={cn('w-60 border-l border-border transition-all')}>
          <div className="space-y-3">
            <div className="p-3 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={visibleColumns.every((col) => col.getIsVisible())}
                  onChange={(e) => {
                    visibleColumns.forEach((col) =>
                      col.toggleVisibility(e.target.checked),
                    );
                  }}
                />
                <Badge className="h-5 min-w-5 rounded-full px-1.5 font-mono tabular-nums">
                  {table.getVisibleLeafColumns().length}
                </Badge>
              </div>
              <Input
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-50 overflow-y-auto">
              <div className="px-3 py-1 space-y-3">
                {visibleColumns.length > 0 ? (
                  visibleColumns.map((column) => (
                    <div key={column.id}>
                      <Label className="capitalize">
                        <Checkbox
                          {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />{' '}
                        <span className="truncate">
                          {column.id
                            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                            .replace(/^./, (str) => str.toUpperCase())}{' '}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No columns found
                  </div>
                )}
              </div>
            </div>
            <Separator />
            <div className="p-3">
              <div className="space-y-3">
                <Label className="capitalize" htmlFor="split">
                  <Checkbox
                    id="split"
                    checked={split}
                    onChange={() => setSplit(!split)}
                  />
                  <span className="truncate">Split Mode</span>
                </Label>
                <Label htmlFor="col-pin">
                  <Checkbox
                    id="col-pin"
                    checked={table.getColumn('pin')?.getIsVisible()}
                    onChange={(e) =>
                      table.getColumn('pin')?.toggleVisibility(e.target.checked)
                    }
                  />
                  <span className="truncate">Show row pin column</span>
                </Label>
                <Label htmlFor="col-row-dnd">
                  <Checkbox
                    id="col-row-dnd"
                    checked={table.getColumn('drag-handle')?.getIsVisible()}
                    onChange={(e) =>
                      table
                        .getColumn('drag-handle')
                        ?.toggleVisibility(e.target.checked)
                    }
                  />
                  <span className="truncate">Show DND Column</span>
                </Label>
              </div>
            </div>
            <Separator />
            <div className="p-3 flex justify-between flex-wrap gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetColumnPinning(true)}
                  >
                    <MoveRight />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Unpin all columns</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetColumnOrder(true)}
                  >
                    <ListRestart />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset column order</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetColumnSizing(true)}
                  >
                    <StretchHorizontal />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset column sizes</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetColumnVisibility(true)}
                  >
                    <EyeOff />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Column Visibility</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetSorting(true)}
                  >
                    <Shuffle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Column Sort</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetRowPinning(true)}
                  >
                    <PinOff />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Row Pinned</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.resetRowSelection(true)}
                  >
                    <CheckCircle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Row Selection</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      {activePanel === 'toolbar' && (
        <div className={cn('w-60 border-l border-border transition-all p-3')}>
          Under development
        </div>
      )}
      {activePanel === 'filter' && (
        <div className={cn('w-60 border-l border-border transition-all')}>
          <div className="space-y-3">
            <div className="p-3">
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => {
                  if (setGlobalFilter) {
                    setGlobalFilter(String(value));
                  }
                }}
                placeholder="Search all columns..."
              />
            </div>
            <div className="overflow-y-auto h-[65vh] px-3 space-y-3">
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers
                    .filter(
                      (header) => !['rowNumber'].includes(header.column.id),
                    )
                    .map((header) => (
                      <ToolbarFilter key={header.id} column={header.column} />
                    ))}
                </React.Fragment>
              ))}
            </div>
            <Separator />
            <div className="px-3">
              <Button
                onClick={() => table.setColumnFilters([])}
                variant="outline"
              >
                <ListRestart />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-10 border-l border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'toolbar', label: 'Toolbar', icon: Settings },
          { value: 'filter', label: 'Filter', icon: Filter },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            className={cn(
              'writing-mode-vertical-lr rounded-none h-auto w-full hover:!bg-background cursor-pointer',
              activePanel === value && 'bg-background',
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
