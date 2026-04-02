import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { authClient } from "@/lib/auth-client";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Team 578",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  loader: async () => {
    const result = await authClient.getSession();
    return result.data;
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const session = Route.useLoaderData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <div className="flex flex-col min-h-screen">
          <Header />
          <div>{session && session.user.name}</div>
          <main className="grow">{children}</main>
        </div>
        <Footer />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
