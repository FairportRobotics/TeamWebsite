import { authClient } from "@/lib/auth-client";
import {
  SUPPORTED_AUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
} from "@/lib/auth/oauth-providers";
import { TeamActionButton } from "./team-action-buttom";

export function SocialAuthButtons() {
  return SUPPORTED_AUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon;

    return (
      <TeamActionButton
        key={provider}
        variant="default"
        action={() => {
          return authClient.signIn.social({ provider, callbackURL: "/" });
        }}
      >
        <Icon />
        {SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
      </TeamActionButton>
    );
  });
}
