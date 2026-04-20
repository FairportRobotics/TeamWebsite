import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sponsors/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Our <span className="text-red-600">sponsors</span>
        </PageTitle>
        <PageDescription>
          This is where we can display information about and for sponsors.
        </PageDescription>
      </PageHeader>

      <ul className="list-disc">
        <li>Show the sponsor logos</li>
        <li>
          Display a list of all the benefits to becomming a sponsor. Maybe we
          should come up with a Tier list of donations and other support. Each
          tier includes more visibility or perks for sponsors. One team states
          that for a high-level Tier, the team will bring the robot to your
          place of business or other organized event and put on a demonstration.
        </li>
        <li>
          Provide a means for insterested sponsors to get in touch with us.
          Provide an email address and maybe a form to fill out to get more
          information about becoming a sponsor.
        </li>
        <li>
          Coach, Mentor Roles: Provide a means of editing the list of Sponsors.
        </li>
      </ul>
    </div>
  );
}
