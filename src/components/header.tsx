"use client";

// prettier-ignore
import { authClient } from "@/lib/auth-client";
import { hasAnyPermission } from "@/lib/auth/utils/permissions";
import { Permissions } from "@/lib/permissions";
import { Link, useNavigate } from "@tanstack/react-router";
import type { User } from "better-auth";
import { ImpersonateButton } from "./impersonate-button";
import { Button } from "./ui/button";

export interface NavUserProps {
  user?: User | undefined;
}

export default function Header() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const hasAdminPermission = hasAnyPermission(session?.user.role, [
    Permissions.UserAdminister,
    Permissions.EventAdminister,
    Permissions.SponsorAdminister,
    Permissions.GameYearAdminister,
  ]);

  async function handleSignOut() {
    await authClient.signOut();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 bg-(--color-accent) px-4 backdrop-blur-lg">
      <nav className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <section className="flex items-center justify-center gap-2">
          <NavigationLink label="Home" link="/" />
          <NavigationLink label="Team" link="/team" />
          <NavigationLink label="Games" link="/games" />
          <NavigationLink label="Calendar" link="/calendar" />
          <NavigationLink label="Sponsors" link="/sponsors" />

          {hasAdminPermission && <NavigationLink label="Admin" link="/admin" />}
        </section>
        <section className="flex items-center justify-center gap-3">
          {!isPending && (
            <>
              {session ? (
                <>
                  <ImpersonateButton />
                  <Button variant="destructive" onClick={() => handleSignOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="default">
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

function NavigationLink({ label, link }: { label: string; link: string }) {
  return (
    <>
      <Link
        to={link}
        activeOptions={{ exact: false }}
        activeProps={{
          className:
            "uppercase px-4 py-2 text-white font-extrabold rounded-md bg-(--color-destructive)",
        }}
        inactiveProps={{
          className:
            "uppercase px-4 py-2 text-white font-extrabold rounded-md hover:bg-(--color-secondary) hover:text-(--color-destructive)",
        }}
      >
        {label}
      </Link>
    </>
  );
}
