import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { type ReactNode } from "react";

export function PageSectionContainer({
  title,
  subTitle,
  initialState,
  children,
}: {
  title: string;
  subTitle?: string;
  initialState: "expanded" | "collapsed";
  children: ReactNode;
}) {
  return (
    <Card className="mx-auto w-full m-0 p-0">
      <CardContent className="m-0 p-0">
        <Collapsible className="m-0 p-0" defaultOpen={initialState === "expanded"}>
          <CollapsibleTrigger asChild className="m-0 p-0">
            <div className="flex flex-row items-center justify-between bg-accent text-foreground text-2xl font-extrabold p-4">
              <div className="flex flex-row gap-4 items-baseline">
                <div className="text-foreground">{title}</div>
                {subTitle && <div className="text-sm text-foreground/50">{subTitle}</div>}
              </div>
              <Button variant="outline" className="group" size="lg">
                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="w-full p-4">{children}</CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
