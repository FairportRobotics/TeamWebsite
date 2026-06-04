import { DataTable } from "@/components/site/DataTable";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
// prettier-ignore
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// prettier-ignore
// prettier-ignore
import { getDateRangeParts } from "@/lib/utils";
import { eventQueries, useDeletePublishedMutation } from "@/queries/eventQueries";
import type { PublishedEvent } from "@/server/functions/calendar/getPublishedEvents";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
// prettier-ignore
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Pencil, Trash2, TrashIcon } from "lucide-react";
import React from "react";

export function EventPublishedSection() {
  const router = useRouter();
  const { data } = useSuspenseQuery(eventQueries.published());
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [selectedEventCode, setSelectedEventCode] = React.useState<string | null>(null);

  const deleteMutation = useDeletePublishedMutation();

  const handleVerifyDelete = (code: string) => {
    setSelectedEventCode(code);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedEventCode!);
    setSelectedEventCode(null);
    setShowDeleteAlert(false);
  };

  const columns: ColumnDef<PublishedEvent>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dates
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
      header: () => {
        return <div className="flex justify-end">Actions</div>;
      },
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="default"
              onClick={() =>
                router.navigate({ to: "/admin/calendar/$id/published", params: { id: id } })
              }
              title="Edit"
              aria-description="Edit"
            >
              <Pencil />
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleVerifyDelete(id)}
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

  return (
    <PageSectionContainer
      title="Published Events"
      subTitle={`(${data.length} records)`}
      initialState="collapsed"
    >
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
      <DataTable data={data} columns={columns} />
    </PageSectionContainer>
  );
}
