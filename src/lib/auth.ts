import { db } from "@/db/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  appName: "Better-Auth Tutorial",

  // Enable support for the database which Better-Auth will be using to store
  // auth information. This is SO much better than Clerk or the auth supported
  // provided by Supabase, Neon, Firebase and other DB providers.
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // Enable support for registering and authenticating via email/password.
  // Additionally, provide a hook to support sending a password reset
  // email with link and instructions.
  emailAndPassword: {
    enabled: true,
  },

  // Enable support for desired OAuth social login providers.
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      prompt: "consent",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      prompt: "select_account",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account",
    },
  },

  plugins: [tanstackStartCookies()],
});
