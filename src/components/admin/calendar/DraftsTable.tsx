import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDateRangeParts } from "@/lib/utils";
import { deleteCalendarFn } from "@/server/functions/calendar/deleteCalendar";
import type { CalendarListForAdminItem } from "@/server/functions/calendar/getCalendarListForAdmin";
import { Link, useRouter } from "@tanstack/react-router";
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
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React from "react";

export function DraftsTable({
  data,
}: {
  data: CalendarListForAdminItem[];
  actionLabel?: string;
  onAction: (id: string) => Promise<{ error: null | { message?: string } }>;
}) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  async function handleEdit(id: string) {
    router.navigate({ to: "/admin/calendar/$id/edit", params: { id } });
  }

  async function handleViewDetails(id: string) {
    router.navigate({ to: "/admin/calendar/$id", params: { id } });
  }

  async function handleRequestApproval(id: string) {
    console.log("Request Approval", id);
    router.invalidate();
  }

  async function handleDelete(id: string) {
    await deleteCalendarFn({ data: { id } });
    router.invalidate();
  }

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
            <Link to="/admin/calendar/$id" params={{ id }}>
              {value}
            </Link>
          </div>
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
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const value = row.original.updatedAt;
        return <div>{format(value, "MM/dd/yyyy hh:mmaaa")}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => {
        return <div className="flex justify-center">Actions</div>;
      },
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 w-12 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-8 w-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewDetails(id)}>Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(id)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRequestApproval(id)}>
                  Request Approval
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent dropdown from stealing focus
                    setOpenDeleteAlert(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the calendar event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
