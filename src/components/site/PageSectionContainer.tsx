import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";

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
  const [state, setState] = useState<"expanded" | "collapsed">(initialState);

  function toggleState(newState: "expanded" | "collapsed") {
    setState(newState);
  }

  return (
    <div className="border-2 border-accent rounded-2xl overflow-hidden">
      <div className="flex flex-row items-center justify-between bg-accent text-3xl font-bold py-2 px-4">
        <div className="flex flex-row gap-4 items-center">
          <div>{title}</div>
          {subTitle && <div className="text-xl">{subTitle}</div>}
        </div>

        {state === "collapsed" ? (
          <Button variant="outline" size="lg" onClick={() => toggleState("expanded")}>
            <Plus className="w-14 h-14" />
          </Button>
        ) : (
          <Button variant="default" size="lg" onClick={() => toggleState("collapsed")}>
            <Minus className="w-14 h-14" />
          </Button>
        )}
      </div>
      {state === "expanded" && <div className="p-4">{children}</div>}
    </div>
  );
}
