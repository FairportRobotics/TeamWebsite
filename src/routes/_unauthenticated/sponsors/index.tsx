import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { PageSection } from "@/components/site/PageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getSponsorListFn } from "@/server/functions/sponsor/getSponsorList";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, CircleCheck, Download, Heart, SquareUser } from "lucide-react";

export const Route = createFileRoute("/_unauthenticated/sponsors/")({
  loader: async () => {
    const sponsors = await getSponsorListFn();
    return sponsors;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const sponsors = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <PageHeader className="w-3/4">
        <PageTitle>
          Our <span className="text-destructive">sponsors</span>
        </PageTitle>
        <PageDescription>
          We are fortunate to have many generous and wonderful sponsors. We cannot thank them enough
          for all of their support.
        </PageDescription>
      </PageHeader>

      <div className="flex flex-col items-center justify-center gap-24">
        <section className="w-3/4">
          <PageSection title="Sponsorship Levels">
            Choose the level that best fits your organization, or, choose your own type and level of
            participation.
          </PageSection>

          <div className="grid grid-cols-3 gap-6">
            <SponsorTierCard
              level="silver"
              pricing="Up to $1,000"
              description="Building the foundation where innovation begins."
              benefits={[
                "Small sized company name or logo on our robot, website and team publications.",
                "Invitations to all our competitions.",
                "Mentions on social media platforms.",
              ]}
            />

            <SponsorTierCard
              level="gold"
              pricing="$1,000 - $2,000"
              description="Accelerating ambition. Turning ideas into impact."
              benefits={[
                "Medium sized company name or logo on our robot, website and team publications.",
                "Invitations to all our competitions.",
                "Mentions on social media platforms.",
                "Given mention during competitions.",
                "Tour of our pit at competitions.",
              ]}
            />

            <SponsorTierCard
              level="platinum"
              pricing="$2,000 and up"
              description="Championing the future of engineering."
              benefits={[
                "Large sized company name or logo on our robot, website and team publications.",
                "Invitations to all our competitions.",
                "Given mention during competitions.",
                "Mentions on social media platforms.",
                "Tour of our pit at competitions.",
                "Invitation to one of our workshop nights where you get to see us build the robot.",
              ]}
            />
          </div>
        </section>

        <section className="w-3/4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="uppercase text-2xl">Sponsorship Packet</CardTitle>
              <CardDescription>
                Download our sponsorship packet which provides details about our team, our operating
                budget and how the donations from all our generous sponsors help the team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="text-lg font-normal py-7" variant="destructive" size="lg">
                <Download /> Download PDF
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="w-3/4">
          <PageSection title="Get Involved">
            Take a chance on us and help our team out. If you're still not sure about what you can
            do you help, please reach out to us. We'd love to have a conversaion with you.
          </PageSection>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="uppercase text-2xl">Donate Online</CardTitle>
                <CardDescription>
                  Team 578 receives donations through{" "}
                  <span className="text-white text-md">TBD</span>, a 501(c)(3) nonprofit (EIN:{" "}
                  <span className="text-white text-md">TBD</span>). Contributions are
                  tax-deductible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="text-lg font-normal py-7" variant="destructive" size="lg">
                  <Heart /> Donate Now
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="uppercase text-2xl">Donate by Check</CardTitle>
                <CardDescription>
                  Make checks payable to <span className="text-white text-md">TBD</span> with{" "}
                  <span className="text-white text-md">TBD</span> in the memo line:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="">
                  <address>
                    1 Main Street<br></br> Fairport, New York 14450
                  </address>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <PageSection title="Our Sponsors">
            Take a chance on us and help our team out. If you're still not sure about what you can
            do you help, please reach out to us. We'd love to have a conversaion with you.
          </PageSection>

          <div className="flex flex-row flex-wrap items-center justify-center gap-10">
            {sponsors.map((s, i) => (
              <div className="w-80 h-80 object-top" key={i}>
                <img
                  src={s.imageUrl || ""}
                  className="h-full w-full object-contain grayscale-100 brightness-100 invert"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-10 mt-10">
            <div className="flex flex-col border-2 rounded-lg items-center justify-center p-6">
              <Building2 className="w-36 h-36" /> Your Company Here
            </div>
            <div className="flex flex-col border-2 rounded-lg items-center justify-center p-6">
              <SquareUser className="w-36 h-36" /> Your Name Here
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SponsorTierCard({
  level,
  description,
  pricing,
  benefits,
}: {
  level: "silver" | "gold" | "platinum";
  description: string;
  pricing: string;
  benefits: string[];
}) {
  const benefitsColors = {
    silver: "text-stone-400",
    gold: "text-amber-400",
    platinum: "text-cyan-400",
  } as const;

  const benefitColor = benefitsColors[level];

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className={cn("text-amber-400 uppercase font-bold text-2xl", benefitColor)}>
          {level}
        </CardTitle>
        <CardTitle className="font-semibold text-xl">{pricing}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0">
        <div className={cn("flex flex-col items-start grow gap-4")}>
          {benefits.map((b, i) => (
            <div className="flex items-start" key={i}>
              <div>
                <CircleCheck className={cn(" w-8 h-8 mr-2 mt-0.5")} />
              </div>
              <span>{b}</span>
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <Button
          className="w-full text-lg font-normal py-7"
          variant={level === "gold" ? "destructive" : "default"}
          size="lg"
        >
          Inquire Now
        </Button>
      </CardContent>
    </Card>
  );
}
