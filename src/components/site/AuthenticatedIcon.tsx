// prettier-ignore
import { Button } from "@/components/ui/button";
// prettier-ignore
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { Bell, Cog, LogOut, User, UserPen } from "lucide-react";

export function AuthenticatedIcon() {
  const navigate = useNavigate();
  async function handleSignOut() {
    await authClient.signOut();
    navigate({ to: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
            <UserPen />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Sign out")}>
            <Bell />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Sign out")}>
            <Cog />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
