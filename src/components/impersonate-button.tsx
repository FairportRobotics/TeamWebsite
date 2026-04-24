// prettier-ignore
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { UserX } from "lucide-react";
import { TeamActionButton } from "./team-action-buttom";

export function ImpersonateButton() {
  const { refetch } = authClient.useSession();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  if (session?.session.impersonatedBy === null) return null;

  return (
    <TeamActionButton
      action={() =>
        authClient.admin.stopImpersonating(undefined, {
          onSuccess: () => {
            navigate({ to: "/admin" });
            refetch();
          },
        })
      }
    >
      <UserX className="size-4" />
    </TeamActionButton>
  );
}
