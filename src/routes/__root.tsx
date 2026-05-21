// prettier-ignore
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { Toaster } from "@/components/ui/sonner";
import type { RouterContext } from "@/router";
import { getSessionFn } from "@/server/functions/auth/getSession";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const sessionData = await getSessionFn();

    context.auth.session = sessionData.session;
    context.auth.user = sessionData.user;

    return null;
  },

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
        name: "description",
        content: "Website for Fairport Robotics Team 578",
      },
      {
        title: "Fairport Robotics Team 578",
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
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="p-10">{children}</main>
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
        <Toaster position="top-center" />
        <Scripts />
      </body>
    </html>
  );
}
