'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { cn } from '../lib/utils';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  maxSelectable?: number;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  selectable,
  onSelectionChange,
  maxSelectable,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: selectable ? [
      {
        id: 'selection',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="w-4 h-4 cursor-none accent-obsidian"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-4 h-4 cursor-none accent-obsidian"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(e) => e.stopPropagation()}
          />
        ),
      },
      ...columns,
    ] : columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    state: {
      sorting,
      rowSelection,
    },
  });

  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, table]);

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-alabaster-3">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="font-display text-[11px] tracking-widest uppercase text-stone py-4 px-4 text-left cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowUp className="w-3 h-3 text-obsidian" />,
                        desc: <ArrowDown className="w-3 h-3 text-obsidian" />,
                      }[header.column.getIsSorted() as string] ?? (
                        header.column.getCanSort() ? <ArrowUpDown className="w-3 h-3 text-stone-2" /> : null
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              className={cn(
                'border-b border-alabaster-3 hover:bg-alabaster-2 transition cursor-none',
                row.getIsSelected() && 'bg-alabaster-3'
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="font-mono text-xs py-4 px-4 text-obsidian">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
