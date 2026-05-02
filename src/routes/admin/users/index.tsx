import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserListFn, type UserListItem } from "@/lib/fn/user";
import { createFileRoute, Link } from "@tanstack/react-router";
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
import { ArrowUpDown } from "lucide-react";
import React from "react";

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Pull needed data from the context.
    const userId = context.data?.user.id;

    // Get all the users.
    const users = await getUserListFn();

    return {
      users,
      selfId: userId,
    };
  },
});

function RouteComponent() {
  const { users, selfId } = Route.useLoaderData();

  return (
    <div className="">
      <PageHeader>
        <PageTitle>
          User <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <PageSection>Users</PageSection>

      <DataTable columns={columns} data={users} currentUserId={selfId} />
    </div>
  );
}

// This allows TypeScript to strongly type the meta data in the ColumnDef.
declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    currentUserId?: string;
  }
}

// Define all the properties which need to be passed into the ColumnDef.
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentUserId: string | undefined;
}

// Describe the columns we will emit in the table.
export const columns: ColumnDef<UserListItem>[] = [
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
      const id = row.original.id;
      return (
        <Link to="/admin/users/$id" params={{ id }}>
          {name}
        </Link>
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

export function DataTable<TData, TValue>({
  columns,
  data,
  currentUserId,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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
    meta: {
      currentUserId: currentUserId || undefined,
    },
  });

  return (
    <div>
      <div className="flex flex-row items-center justify-between pb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="align-top">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {header.id === "name" && (
                        <div className="pl-2 pb-3">
                          <Input
                            placeholder="Filter Names..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => {
                              table.getColumn("name")?.setFilterValue(event.target.value);
                            }}
                            className="max-w-sm"
                          />
                        </div>
                      )}

                      {header.id === "email" && (
                        <div className="pl-2 pb-3">
                          <Input
                            placeholder="Filter Emails..."
                            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => {
                              table.getColumn("email")?.setFilterValue(event.target.value);
                            }}
                            className="max-w-sm"
                          />
                        </div>
                      )}

                      {header.id === "role" && (
                        <div className="pl-2 pb-3">
                          <Input
                            placeholder="Filter Roles..."
                            value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => {
                              table.getColumn("role")?.setFilterValue(event.target.value);
                            }}
                            className="max-w-sm"
                          />
                        </div>
                      )}
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
                    <TableCell key={cell.id} className="pl-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
