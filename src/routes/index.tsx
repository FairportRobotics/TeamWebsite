import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section>
        <Link to="/auth/signup">Sign Up</Link>
        <br />
        <Link to="/auth/signin">Sign In</Link>
      </section>
    </main>
  );
}
