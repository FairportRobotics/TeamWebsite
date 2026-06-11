import { DataTable } from "@/components/site/DataTable";
import { HeaderSortLabel } from "@/components/site/HeaderSortLabel";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { userQueries } from "@/queries/userQueries";
import type { UserListItem } from "@/server/functions/user/getListForAdmin";
import { seedUsersFn } from "@/server/functions/user/seed";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";

export function UsersSection({ currentUserId }: { currentUserId: string }) {
  const router = useRouter();
  const { data } = useSuspenseQuery(userQueries.list());

  const columns: ColumnDef<UserListItem>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <HeaderSortLabel label="Name" column={column} />,
      cell: ({ row }) => {
        const name = row.original.name;
        const userId = row.original.id;
        return (
          <div className="flex flex-row items-center gap-3">
            <Link to="/admin/users/$userId" params={{ userId }}>
              {name}
            </Link>
            {userId === currentUserId ? <div className="bg-destructive px-3 py-1 rounded-full">You</div> : <></>}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <HeaderSortLabel label="Email" column={column} />,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <HeaderSortLabel label="Roles" column={column} />,
      cell: ({ row }) => {
        const value = row.original.role;
        const roles = value?.split(",").map((item) => item.trim());
        return <div className="capitalize">{roles?.sort((a, b) => a.localeCompare(b)).join(", ")}</div>;
      },
    },
    {
      accessorKey: "banned",
      header: ({ column }) => <HeaderSortLabel label="Banned" column={column} />,
      cell: ({ row }) => {
        const value = row.original.banned;
        return <div>{value ? "Yes" : "-"}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <HeaderSortLabel label="Created" column={column} />,
      cell: ({ row }) => {
        const value = row.original.createdAt;
        return <>{value.toLocaleDateString()}</>;
      },
    },
    {
      accessorKey: "accountsCount",
      header: ({ column }) => <HeaderSortLabel label="Accounts" column={column} />,
    },
    {
      accessorKey: "sessionsCount",
      header: ({ column }) => <HeaderSortLabel label="Sessions" column={column} />,
    },
    {
      accessorKey: "sessionsLatest",
      header: ({ column }) => <HeaderSortLabel label="Last Login" column={column} />,
      cell: ({ row }) => {
        const value = row.original.sessionsLatest;
        return <>{value ? value.toLocaleDateString() : "-"}</>;
      },
    },
  ];

  async function handleSeedUsers() {
    await seedUsersFn();
    router.invalidate();
    return { error: null };
  }

  return (
    <div>
      <PageSectionContainer title="Users" subTitle={`(${data.length} records)`} initialState="expanded">
        <DataTable data={data} columns={columns} />
        <TeamActionButton
          variant="destructive"
          className="mt-10 ml-6"
          action={() => {
            return handleSeedUsers();
          }}
        >
          Seed Users
        </TeamActionButton>
      </PageSectionContainer>
    </div>
  );
}
