import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <section className="flex justify-center gap-3">
          <Link to="/">Home</Link>
          <Link to="/team">Team</Link>
          <Link to="/robots">Robots</Link>
          <Link to="/events">Events</Link>
          <Link to="/sponsors">Sponsors</Link>
        </section>
        <Link to="/auth/signin">Sign In</Link>
      </nav>
    </header>
  );
}
