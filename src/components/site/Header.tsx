// prettier-ignore
import { AuthenticatedIcon } from "@/components/site/AuthenticatedIcon";
import { HeaderLink } from "@/components/site/HeaderLink";
import { ImpersonateButton } from "@/components/site/ImpersonateButton";
import ThemeToggle from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/lib/auth//permissions";
import { authClient } from "@/lib/auth/auth-client";
import { hasAnyPermission } from "@/lib/auth/guard";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [hasAdmin, setHasAdmin] = useState<boolean>(false);

  useEffect(() => {
    const result = hasAnyPermission(session?.user.role, [
      Permissions.EventAdminister,
      Permissions.GameYearAdminister,
      Permissions.SponsorAdminister,
      Permissions.UserViewAll,
    ]);

    setHasAdmin(result);
  }, [session, isPending]);

  return (
    <header className="sticky top-0 z-50 bg-sidebar px-4 backdrop-blur-lg">
      <nav className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <Link to="/">
          <h2 className="text-4xl font-extrabold text-destructive uppercase">Team 578</h2>
        </Link>
        <section className="flex items-center justify-center gap-2">
          <HeaderLink label="Home" to="/" />
          <HeaderLink label="Team Members" to="/team" />
          <HeaderLink label="Games" to="/games" />
          <HeaderLink label="Calendar" to="/calendar" />
          <HeaderLink label="Support Us" to="/sponsors" />

          {hasAdmin && <HeaderLink label="Admin" to="/admin" />}
        </section>
        <section className="flex items-center justify-center gap-3">
          <ThemeToggle />
          {!isPending && (
            <>
              {session ? (
                <>
                  <ImpersonateButton />
                  <AuthenticatedIcon />
                </>
              ) : (
                <>
                  <Button variant="default" size="lg">
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </section>
      </nav>
    </header>
  );
}
