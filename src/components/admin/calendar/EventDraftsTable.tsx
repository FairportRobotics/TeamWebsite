import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDateRangeParts } from "@/lib/utils";
import {
  useApproveMutation,
  useDeleteMutation,
  useRequestApprovalMutation,
} from "@/queries/calendarQueries";
import type { DraftEventAdminItem } from "@/server/functions/calendar/getEventListForAdmin";
import { Link } from "@tanstack/react-router";
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
import { ArrowUpDown, CalendarFold, Pencil, Stamp, Trash2, TrashIcon } from "lucide-react";
import React from "react";

export function EventDraftsTable({ data }: { data: DraftEventAdminItem[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [selectedEventCode, setSelectedEventCode] = React.useState<string | null>(null);

  const requestApprovalMutation = useRequestApprovalMutation();
  const approveMutation = useApproveMutation();
  const deleteMutation = useDeleteMutation();

  const handleVerifyDelete = (code: string) => {
    setSelectedEventCode(code);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedEventCode!);
    setSelectedEventCode(null);
    setShowDeleteAlert(false);
  };

  const columns: ColumnDef<DraftEventAdminItem>[] = [
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
        const id = row.original.id;
        const title = row.original.title;

        return (
          <div>
            <Link to="/admin/calendar/$id/edit" params={{ id }}>
              {title}
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
        const visibleTo = row.original.visibleTo;
        return <div>{visibleTo?.join(", ")}</div>;
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
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.original.status;

        return (
          <div className="flex items-center gap-1">
            <Button
              variant="default"
              onClick={() => console.log("Edit", id)}
              title="Edit Draft"
              aria-description="Edit"
            >
              <Pencil />
            </Button>
            {status === "draft" ? (
              <Button
                variant="default"
                onClick={() => console.log("Request Approval", id)}
                title="Request Publish Approval"
                aria-description="Request Publish Approval"
                className="bg-chart-2"
              >
                <CalendarFold />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => console.log("Approve", id)}
                title="Approve to Publish"
                aria-description="Approve to Publish"
                className="bg-chart-4"
              >
                <Stamp />
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={() => console.log("Delete", id)}
              title="Delete"
              aria-description="Delete"
            >
              <Trash2 />
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
    <div>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <TrashIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Calendar Event</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this calendar Event and cannot be undone. Are you sure
              you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  <TableCell key={cell.id} className="items-center py-1">
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
    </div>
  );
}
