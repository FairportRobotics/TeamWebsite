import { DataTable } from "@/components/site/DataTable";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { Button } from "@/components/ui/button";
import { userQueries } from "@/queries/userQueries";
import type { UserListItem } from "@/server/functions/user/getListForAdmin";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export function UsersSection({ currentUserId }: { currentUserId: string }) {
  const { data } = useSuspenseQuery(userQueries.list());

  const columns: ColumnDef<UserListItem>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const name = row.original.name;
        const userId = row.original.id;
        return (
          <div className="flex flex-row items-center gap-3">
            <Link to="/admin/users/$userId" params={{ userId }}>
              {name}
            </Link>
            {userId === currentUserId ? (
              <div className="bg-destructive px-3 py-1 rounded-full">You</div>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.role;
        const roles = value?.split(",").map((item) => item.trim());
        return <div className="capitalize">{roles?.join(", ")}</div>;
      },
    },
    {
      accessorKey: "banned",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Banned
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.banned;
        return <div>{value ? "Yes" : "-"}</div>;
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
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.createdAt;
        return <>{value.toLocaleDateString()}</>;
      },
    },
    {
      accessorKey: "accountsCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Accounts
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "sessionsCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sessions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "sessionsLatest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Login
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value = row.original.sessionsLatest;
        return <>{value ? value.toLocaleDateString() : "-"}</>;
      },
    },
  ];

  return (
    <div>
      <PageSectionContainer
        title="Users"
        subTitle={`(${data.length} records)`}
        initialState="expanded"
      >
        <DataTable data={data} columns={columns} />
      </PageSectionContainer>
    </div>
  );
}
