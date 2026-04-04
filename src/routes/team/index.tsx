import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello from "/team/"!</h1>
      <p>This is where we can list all the current and past team members.</p>
      <ul className="list-disc">
        <li>Display Coaches, Mentors and Students.</li>
        <li>
          For each Team Member, show picture, name, position on the team and a
          brief bio.
        </li>
        <li>Optional: Display email address.</li>
        <li>
          Clicking on Team Member navigates to a details page which includes
          awards and accolades for the Team Member.
        </li>
        <li>Provide a link to view past Team Members.</li>
        <li>
          Coach, Mentor Roles: Provide a means of editing the list of Team
          Members.
        </li>
      </ul>
    </div>
  );
}
