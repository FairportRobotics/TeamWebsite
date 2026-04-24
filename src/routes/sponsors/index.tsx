import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSponsorsFn } from "@/lib/fn/sponsor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sponsors/")({
  component: RouteComponent,
  loader: async () => {
    const sponsors = await getSponsorsFn();
    return sponsors;
  },
});

// TODO: Adjust images so they align better. Wegmans, for example, pushes the container down.
// TODO: Consider whether we want to show color or B&W.
function RouteComponent() {
  const sponsors = Route.useLoaderData();

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Our <span className="text-(--color-destructive)">sponsors</span>
        </PageTitle>
        <PageDescription>
          We are fortunate to have so many generous and wonderful sponsors. We
          cannot thank them enough for all their support.
        </PageDescription>
      </PageHeader>

      <div className="flex flex-row flex-wrap justify-center gap-4">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="">
            <CardHeader>
              <CardTitle>{sponsor.name}</CardTitle>
              <CardDescription>{sponsor.provided}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-60 h-60 object-top">
                <img
                  src={sponsor.imageUrl || ""}
                  className="h-full w-full object-contain grayscale-100 brightness-100 invert"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="w-full flex flex-row justify-center gap-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Your Company Name Here</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <p>
                  Small gift cards, swag or other contributions are always
                  appreciated!
                </p>
                <p>No amount is too small to make a difference.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-60 h-60 flex items-center justify-center">
                <img
                  src="https://www.citypng.com/public/uploads/preview/building-business-black-icon-png-image-701751695035131smqgwcjfwc.png"
                  className="h-full w-full object-contain grayscale-100 brightness-100 invert"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Your Name Here</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <p>Even individuals can contribute!</p>
                <p>If you prefer, join our Team and become a mentor.</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-60 h-60 flex items-center justify-center">
                <img
                  src="https://www.vhv.rs/dpng/d/41-416356_transparent-background-person-icon-hd-png-download.png"
                  className="h-full w-full object-contain grayscale-100 brightness-100 invert"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
