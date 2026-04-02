"use client";

import { authClient } from "@/lib/auth-client";
import { Link, useNavigate } from "@tanstack/react-router";
import type { User } from "better-auth";
import { Button } from "./ui/button";

export interface NavUserProps {
  user?: User | undefined;
}

export default function Header() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    console.log("Signing out...");
    await authClient.signOut();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <section className="flex items-center justify-center gap-3">
          <Link to="/">Home</Link>
          <Link to="/team">Team</Link>
          <Link to="/robots">Robots</Link>
          <Link to="/events">Events</Link>
          <Link to="/sponsors">Sponsors</Link>
        </section>
        <section className="flex items-center justify-center gap-3">
          <Link to="/admin">Admin</Link>

          {session ? (
            <>
              <Button variant="outline" onClick={() => handleSignOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}
