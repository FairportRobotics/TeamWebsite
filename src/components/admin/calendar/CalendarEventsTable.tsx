import { Button } from "@/components/ui/button";
// prettier-ignore
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { getDateRangeParts } from "@/lib/utils";
import type { CalendarListForAdminItem } from "@/server/functions/calendar/getCalendarListForAdmin";
import { Link } from "@tanstack/react-router";
// prettier-ignore
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export function CalendarEventsTable({ data }: { data: CalendarListForAdminItem[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const columns: ColumnDef<CalendarListForAdminItem>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.title;
        const id = row.original.id;

        return (
          <div>
            <Link to="/admin/calendar/$id/edit" params={{ id }}>
              {value}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "dates",
      header: "Dates",
      cell: ({ row }) => {
        const dates = row.original.dates;
        return dates.map((d) => {
          const parts = getDateRangeParts(d.startAt, d.endAt);
          if (parts.length === 3) {
            return (
              <div key={d.id}>
                {parts[0]}: {parts[1]} - {parts[2]}
              </div>
            );
          } else {
          }
        });
      },
    },
    {
      accessorKey: "visibleTo",
      header: "Visible To",
      cell: ({ row }) => {
        const value = row.original.visibleTo;
        return <div>{value?.join(", ")}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created By",
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt;
        const updatedBy = row.original.createdBy?.name;
        return (
          <div>
            <div>{updatedBy}</div>
            <div>{format(updatedAt, "MM/dd/yyyy h:mmaaa")} </div>
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated By",
      cell: ({ row }) => {
        const updatedAt = row.original.updatedAt;
        const updatedBy = row.original.updatedBy?.name;
        return (
          <div>
            <div>{updatedBy}</div>
            <div>{format(updatedAt, "MM/dd/yyyy h:mmaaa")} </div>
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
