"use client";

// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { Permissions } from "@/lib/auth/permissions";
import { hasAnyPermissionFn } from "@/lib/auth/server";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { User } from "better-auth";
import { useState } from "react";
import { HeaderLink } from "./header-link";
import { ImpersonateButton } from "./impersonate-button";
import { Button } from "./ui/button";

export interface NavUserProps {
  user?: User | undefined;
}

export default function Header() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const [hasAdmin, setHasAdmin] = useState<boolean>(false);

  const checkPermissions = useServerFn(hasAnyPermissionFn);

  checkPermissions({
    data: {
      permissions: [
        Permissions.EventAdminister,
        Permissions.GameYearAdminister,
        Permissions.SponsorAdminister,
        Permissions.UserAdminister,
      ],
    },
  }).then((result) => setHasAdmin(result));

  async function handleSignOut() {
    await authClient.signOut();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 bg-(--color-accent) px-4 backdrop-blur-lg">
      <nav className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <section className="flex items-center justify-center gap-2">
          <HeaderLink label="Home" to="/" />
          <HeaderLink label="Team Members" to="/team" />
          <HeaderLink label="Games" to="/games" />
          <HeaderLink label="Calendar" to="/calendar" />
          <HeaderLink label="Sponsors" to="/sponsors" />

          {hasAdmin && <HeaderLink label="Admin" to="/admin" />}
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
