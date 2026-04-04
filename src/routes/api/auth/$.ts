import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

// This is used by Better-Auth to handle all auth related API routes.
// It should not be modified unless you know what you're doing.
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
