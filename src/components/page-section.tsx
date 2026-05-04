export function PageSection({ children }: React.ComponentProps<"div">) {
  return (
    <div className="bg-(--color-destructive) text-center p-4 rounded-2xl">
      <h2 className="text-white text-3xl font-extrabold uppercase">{children}</h2>
    </div>
  );
}
