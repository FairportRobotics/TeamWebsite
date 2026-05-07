import { ArrowDown, ArrowUp } from "lucide-react";
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

  function toggleState() {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  }

  return (
    <div className="border-2 border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex flex-row items-center justify-between bg-slate-800 text-3xl font-bold py-2 px-4">
        <div className="flex flex-row gap-4 items-center">
          <div>{title}</div>
          {subTitle && <div className="text-xl">{subTitle}</div>}
        </div>

        {state === "collapsed" ? (
          <ArrowDown
            className="w-14 h-14 hover:cursor-pointer hover:bg-slate-500 rounded-lg p-2"
            onClick={() => toggleState()}
          />
        ) : (
          <ArrowUp
            className="w-14 h-14 hover:cursor-pointer hover:bg-slate-500 rounded-lg p-2"
            onClick={() => toggleState()}
          />
        )}
      </div>
      {state === "expanded" && <div className="p-4">{children}</div>}
    </div>
  );
}
