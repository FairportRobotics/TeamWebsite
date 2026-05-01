import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
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
import { RowActions } from "@/components/user-row-actions";
import { hasAnyPermission } from "@/lib/auth/utils/permissions";
import { getUserListFn, type AdminUser } from "@/lib/fn/user";
import { Permissions } from "@/lib/permissions";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/admin/users")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Pull needed data from the context.
    const userId = context.data?.user.id;
    const userRoles = context.data?.user.role ?? "";

    // Get all the users.
    const users = await getUserListFn();

    // Get fine-grained permissions for UI adjustment.
    const canBan = hasAnyPermission(userRoles, [Permissions.UserBan]);
    const canImpersonate = hasAnyPermission(userRoles, [Permissions.UserImpersonate]);
    const canRevokeSessions = hasAnyPermission(userRoles, [Permissions.UserRevokeSessions]);
    const canDelete = hasAnyPermission(userRoles, [Permissions.UserDelete]);

    return {
      users,
      selfId: userId,
      canBan,
      canImpersonate,
      canRevokeSessions,
      canDelete,
    };
  },
});

function RouteComponent() {
  const { users, selfId, canBan, canImpersonate, canRevokeSessions, canDelete } =
    Route.useLoaderData();

  const canSeeActions = canBan || canImpersonate || canRevokeSessions || canDelete;

  return (
    <div>
      <PageHeader>
        <PageTitle>
          User <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <DataTable columns={columns} data={users} currentUserId={selfId} />
    </div>
  );
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    currentUserId?: string;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentUserId: string | undefined;
}

export const columns: ColumnDef<AdminUser>[] = [
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
      const userRow = row.original;
      return (
        <div>
          <div className="text-xl font-semibold text-(--color-destructive)">{userRow.name}</div>
          <div className="">{userRow.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Roles",
    cell: ({ row }) => {
      const role = row.original.role;
      const roles = role?.split(",").map((item) => item.trim());
      return <div className="capitalize">{roles?.join(", ")}</div>;
    },
  },
  {
    accessorKey: "activeSessions",
    header: "Active Sessions",
    cell: ({ row }) => {
      <div>{row.original.sessions.length}</div>;
    },
  },
  {
    accessorKey: "relatedAccounts",
    header: "Related Accounts",
    cell: ({ row }) => {
      <div>{row.original.accounts.length}</div>;
    },
  },
  {
    accessorKey: "isBaned",
    header: "Banned",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const userRow = row.original;
      const isCurrentUser = row.original.id === table.options.meta?.currentUserId;

      if (isCurrentUser) {
        return <></>;
      }

      return <RowActions id={userRow.id} isBanned={userRow.banned ?? false} />;
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-md border">
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
                    <TableCell key={cell.id}>
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

      <div className="flex items-center justify-between space-x-2 py-4">
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
    </div>
  );
}
