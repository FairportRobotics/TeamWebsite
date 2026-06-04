import { DataTable } from "@/components/site/DataTable";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { Button } from "@/components/ui/button";
import type { AccountSelect } from "@/db/schema";
import { useClipboard } from "@/hooks/useClipboard";
import { type ColumnDef } from "@tanstack/react-table";
import { CopyIcon } from "lucide-react";

export function AccountsSection({ data }: { data: AccountSelect[] }) {
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

  return (
    <PageSectionContainer
      title="Accounts"
      subTitle={`(${data.length} records)`}
      initialState="expanded"
    >
      <DataTable data={data} columns={columns} />
    </PageSectionContainer>
  );
}
