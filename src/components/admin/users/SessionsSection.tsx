import { DataTable } from "@/components/site/DataTable";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { Button } from "@/components/ui/button";
import type { SessionSelect } from "@/db/schema";
import { useClipboard } from "@/hooks/useClipboard";
import { useRevokeUserSessionMutation, useRevokeUserSessionsMutation } from "@/queries/userQueries";
import { type ColumnDef } from "@tanstack/react-table";
import { CopyIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function SessionsSection({ data, userId }: { data: SessionSelect[]; userId: string }) {
  const { copyToClipboard } = useClipboard();

  const revokeSession = useRevokeUserSessionMutation();
  const revokeAllSessions = useRevokeUserSessionsMutation();

  async function handleRevokeSession(sessionToken: string) {
    revokeSession.mutate({ userId, sessionToken });
    toast.success("Successfully revoked session");
    return { error: null };
  }

  async function handleRevokeAllSessions() {
    revokeAllSessions.mutate(userId);
    toast.success("Successfully revoked all sessions");
    return { error: null };
  }

  const columns: ColumnDef<SessionSelect>[] = [
    {
      accessorKey: "ipAddress",
      header: "Origin",
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
      accessorKey: "expiresAt",
      header: "Expires",
      cell: ({ row }) => {
        const value = row.original.expiresAt;
        return <div>{value.toISOString()}</div>;
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
    {
      accessorKey: "userId",
      header: () => {
        return <div className="flex justify-end">Actions</div>;
      },
      cell: ({ row }) => {
        const sessionToken = row.original.token;

        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="destructive"
              onClick={() => handleRevokeSession(sessionToken)}
              title="Revoke session"
              aria-description="Revoke session"
            >
              <EyeOff />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <PageSectionContainer
      title="Sessions"
      subTitle={`(${data.length} records)`}
      initialState="expanded"
    >
      <DataTable data={data} columns={columns} />

      <div>
        <TeamActionButton
          variant="destructive"
          disabled={data.length == 0}
          action={() => {
            return handleRevokeAllSessions();
          }}
        >
          Revoke All Sessions
        </TeamActionButton>
      </div>
    </PageSectionContainer>
  );
}
