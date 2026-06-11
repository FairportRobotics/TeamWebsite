import type { Column } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

export function HeaderSortLabel<T>({ label, column }: { label: string; column: Column<T> }) {
  return (
    <div
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex flex-row items-center gap-1 cursor-pointer underline"
    >
      {label}
      {column.getIsSorted() === "asc" ? <ArrowDownAZ className="size-4" /> : <ArrowDownZA className="size-4" />}
    </div>
  );
}
