import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import type { auth } from "@/lib/auth";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ auth: typeof auth }>()({
  beforeLoad: async ({ context }) => {
    // TODO:
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
          <main className="p-4">{children}</main>
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
