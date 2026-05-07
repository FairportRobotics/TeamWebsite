// prettier-ignore
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { getSession, SessionContext, type AppSession } from "@/lib/auth/utils/session";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "../styles.css?url";

interface RouterContext {
  session: AppSession;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await getSession();
    return { session: session };
  },
  loader: async ({ context }) => {
    return { session: context.session };
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
  const { session } = Route.useLoaderData();

  return (
    <SessionContext.Provider value={session}>
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
    </SessionContext.Provider>
  );
}
