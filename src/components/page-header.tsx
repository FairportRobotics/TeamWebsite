import { cn } from "@/lib/utils";

function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("flex flex-col items-center mb-20", className)}
      {...props}
    />
  );
}

function PageTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-title"
      className={cn("leading-none font-extrabold text-6xl uppercase", className)}
      {...props}
    />
  );
}

function PageDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-description"
      className={cn("text-muted-foreground text-xl mt-4 w-1/2 text-center", className)}
      {...props}
    />
  );
}

export { PageDescription, PageHeader, PageTitle };
