import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AccountSelect } from "@/db/schema";
import { useClipboard } from "@/hooks/useClipboard";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { CopyIcon } from "lucide-react";
import React from "react";

export function AccountsTable({ data }: { data: AccountSelect[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const { copyToClipboard } = useClipboard();

  const columns: ColumnDef<AccountSelect>[] = [
    {
      accessorKey: "providerId",
      header: "Provider",
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const value = row.original.createdAt;
        return <div>{value.toISOString()}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const value = row.original.updatedAt;
        return <div>{value.toISOString()}</div>;
      },
    },
    {
      accessorKey: "idToken",
      header: "JWT",
      cell: ({ row }) => {
        const value = row.original.idToken ?? "";
        return (
          <div className="py-2">
            <Button onClick={() => copyToClipboard(value)} variant="outline">
              <CopyIcon />
            </Button>
          </div>
        );
      },
    },
    {
      header: "JSON",
      cell: ({ row }) => {
        const value = JSON.stringify(row.original, null, 2);
        return (
          <div className="py-2">
            <Button onClick={() => copyToClipboard(value)} variant="outline">
              <CopyIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="items-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No records.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
