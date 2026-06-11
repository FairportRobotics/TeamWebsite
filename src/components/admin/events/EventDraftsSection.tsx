import { DataTable } from "@/components/site/DataTable";
import { HeaderSortLabel } from "@/components/site/HeaderSortLabel";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDateRangeParts, getDateTimeString } from "@/lib/dates";
import {
  eventQueries,
  useApproveMutation,
  useDeleteDraftMutation,
  useRejectMutation,
  useRequestApprovalMutation,
} from "@/queries/eventQueries";
import type { DraftEvent } from "@/server/functions/calendar/getDraftEvents";
import { seedEventsFn } from "@/server/functions/calendar/seed";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, Pencil, Stamp, Star, StarOff, Trash2, TrashIcon } from "lucide-react";
import React from "react";

export function EventDraftsSection() {
  const router = useRouter();

  const { data } = useSuspenseQuery(eventQueries.drafts());

  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);

  // Entity mutations.
  const requestApprovalMutation = useRequestApprovalMutation();
  const rejectMutation = useRejectMutation();
  const approveMutation = useApproveMutation();
  const deleteMutation = useDeleteDraftMutation();

  async function handleSeedCalendar() {
    await seedEventsFn();
    router.invalidate();
    return { error: null };
  }

  const handleVerifyDelete = (id: string) => {
    setSelectedEventId(id);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedEventId!);
    setSelectedEventId(null);
    setShowDeleteAlert(false);
  };

  const columns: ColumnDef<DraftEvent>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => <HeaderSortLabel label="Title" column={column} />,
      cell: ({ row }) => {
        const id = row.original.id;
        const title = row.original.title;

        return (
          <div>
            <Link to="/admin/calendar/$id" params={{ id }}>
              {title}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => <HeaderSortLabel label="Location" column={column} />,
    },
    {
      accessorKey: "dates",
      header: ({ column }) => <HeaderSortLabel label="Dates" column={column} />,
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
      accessorKey: "createdAt",
      header: ({ column }) => <HeaderSortLabel label="Created" column={column} />,
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt;
        const updatedBy = row.original.createdBy?.name;
        return (
          <div>
            <div>{updatedBy}</div>
            <div>{getDateTimeString(updatedAt)} </div>
          </div>
        );
      },
    },
    {
      accessorKey: "visibleTo",
      header: ({ column }) => <HeaderSortLabel label="Visible To" column={column} />,
      cell: ({ row }) => {
        const visibleTo = row.original.visibleTo;
        return <div>{visibleTo?.sort((a, b) => a.localeCompare(b)).join(", ")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <HeaderSortLabel label="State" column={column} />,
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge variant={status as any}>{status}</Badge>;
      },
    },
    {
      accessorKey: "id",
      header: () => {
        return <div className="text-center">Actions</div>;
      },
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.original.status;

        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuItem
                  onClick={() => router.navigate({ to: "/admin/calendar/$id/draft", params: { id: id } })}
                >
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                {status === "draft" && (
                  <>
                    <DropdownMenuItem onClick={() => requestApprovalMutation.mutate(id)}>
                      <Star />
                      Request Approval
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {status === "pending" && (
                  <>
                    <DropdownMenuItem onClick={() => rejectMutation.mutate({ id, rejectReason: "Testing 1..2..3.." })}>
                      <StarOff />
                      Reject
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => approveMutation.mutate(id)}>
                      <Stamp />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem variant="destructive" onClick={() => handleVerifyDelete(id)}>
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <PageSectionContainer title="Event Drafts" subTitle={`(${data.length} records)`} initialState="expanded">
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <TrashIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this Event draft and cannot be undone. Are you sure you want to continue?
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

      <div>
        <Button variant="default">
          <Link to="/admin/calendar/new">Create New Event</Link>
        </Button>

        <TeamActionButton
          variant="destructive"
          className="mt-10 ml-6"
          action={() => {
            return handleSeedCalendar();
          }}
        >
          Seed Events
        </TeamActionButton>
      </div>
    </PageSectionContainer>
  );
}
