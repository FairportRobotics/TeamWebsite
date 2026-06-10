import { BackTo } from "@/components/site/BackTo";
import { PageHeader, PageTitle } from "@/components/site/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDateRangeString } from "@/lib/utils";
import { getEventListDetailsFn } from "@/server/functions/calendar/getEventDetails";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { format } from "date-fns";
import { CircleSmall, Clock, InfoIcon, MapPin, Signature, type LucideProps } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

export const Route = createFileRoute("/_unauthenticated/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getEventListDetailsFn({ data: { id: params.id } });

    if (!results) throw redirect({ to: "/calendar" });

    return results;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <BackTo to="/calendar" label="Calendar" />
      <PageHeader>
        <PageTitle>
          Event <span className="text-destructive">Details</span>
        </PageTitle>
      </PageHeader>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <DetailsSection title={data.title} icon={InfoIcon}>
            <div>{data.description}</div>
          </DetailsSection>
          <div className="grid grid-cols-2 gap-8 mt-8">
            {data.dates.length > 0 && (
              <DetailsSection title="When?" icon={Clock}>
                <div>
                  <div className="">
                    {data.dates.map((d, i) => {
                      const dateParts = getDateRangeString(d.startAt, d.endAt);

                      return (
                        <div key={i}>
                          {dateParts.length === 3 ? (
                            <div className="flex flex-row items-center gap-2">
                              <CircleSmall />
                              <div>
                                {format(d.startAt, "EEE")}, {dateParts[0]} from {dateParts[1]} to{" "}
                                {dateParts[2]}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-row items-center gap-2">
                              <CircleSmall />
                              <div>
                                {dateParts[0]} {dateParts[1]}
                              </div>
                              <div>
                                {dateParts[2]} {dateParts[3]}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DetailsSection>
            )}

            {data.location && (
              <DetailsSection title="Where?" icon={MapPin}>
                <div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`}
                    target="_blank"
                    className="underline text-red-500"
                  >
                    {data.location}
                  </a>
                </div>
              </DetailsSection>
            )}

            {data.informationLink && (
              <DetailsSection title="For more information..." icon={InfoIcon}>
                <div>
                  Please{" "}
                  <a href={data.informationLink} target="_blank" className="underline text-red-500">
                    visit this link.
                  </a>
                </div>
              </DetailsSection>
            )}

            {data.signupLink && (
              <DetailsSection title="To sign up..." icon={Signature}>
                <div>
                  Please{" "}
                  <a href={data.signupLink} target="_blank" className="underline text-red-500">
                    visit this link.
                  </a>
                </div>
              </DetailsSection>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailsSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<LucideProps>;
  children: ReactNode;
}) {
  return (
    <div className="border-2 border-amber-600 rounded-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between bg-amber-600 p-2">
        <h2 className="font-semibold text-xl">{title}</h2>
        <Icon className="text-white bg-amber-600" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}
