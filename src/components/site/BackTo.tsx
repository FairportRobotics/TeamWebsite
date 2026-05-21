// prettier-ignore
import type { AppRouter } from "@/router";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

type Props = LinkProps<AppRouter> & {
  label: string;
};

export function BackTo(props: Props) {
  const { label, ...linkProps } = props;
  return (
    <Link {...linkProps} className="absolute flex flex-row gap-1">
      <ChevronLeft /> {label}
    </Link>
  );
}
