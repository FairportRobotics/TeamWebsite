export function PageSection({ title, children }: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <h2 className="uppercase text-4xl font-bold">{title}</h2>
      <div className="text-muted mt-2">{children}</div>
    </div>
  );
}
