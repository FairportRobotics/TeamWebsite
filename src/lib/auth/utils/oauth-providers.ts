// prettier-ignore
import { DiscordIcon, GitHubIcon, GoogleIcon } from "@/components/site/OAuthIcons";
import type { ComponentProps, ElementType } from "react";

export const SUPPORTED_AUTH_PROVIDERS = ["github", "google", "discord"] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_AUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProvider,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  discord: { name: "Discord", Icon: DiscordIcon },
  github: { name: "GitHub", Icon: GitHubIcon },
  google: { name: "Google", Icon: GoogleIcon },
};
