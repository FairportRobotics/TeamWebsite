// prettier-ignore
import type { AppRouter } from "@/router";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

type Props = LinkProps<AppRouter> & {
  label: string;
};

export function HeaderLink(props: Props) {
  const { label, ...linkProps } = props;
  return (
    <Link
      {...linkProps}
      activeOptions={{ exact: false }}
      activeProps={{
        className: "uppercase px-4 py-2 font-extrabold rounded-md bg-background text-foreground",
      }}
      inactiveProps={{
        className:
          "uppercase px-4 py-2 font-extrabold rounded-md hover:bg-background/50 hover:text-foreground",
      }}
    >
      {label}
    </Link>
  );
}
