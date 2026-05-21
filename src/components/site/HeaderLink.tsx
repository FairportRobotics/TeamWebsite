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
        className: "uppercase px-4 py-2 text-white font-extrabold rounded-md bg-destructive",
      }}
      inactiveProps={{
        className:
          "uppercase px-4 py-2 text-white font-extrabold rounded-md hover:bg-destructive/50 hover:text-white",
      }}
    >
      {label}
    </Link>
  );
}
