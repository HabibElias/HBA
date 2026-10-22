import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";

if (
  !process.env.BETTER_AUTH_SECRET ||
  process.env.BETTER_AUTH_SECRET.length < 32
)
  throw new Error("Set a random BETTER_AUTH_SECRET of at least 32 characters.");
if (!process.env.BETTER_AUTH_URL)
  throw new Error("BETTER_AUTH_URL must match this website's origin.");
export const auth = betterAuth({
  appName: "Hiwot Birhan Summit",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      roleId: { type: "string", defaultValue: "viewer", input: false },
      active: { type: "boolean", defaultValue: true, input: false },
      mustChangePassword: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 30,
    cookieCache: { enabled: false },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: { "/sign-in/email": { window: 60, max: 5 } },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (value) => {
          const person = await db.query.user.findFirst({
            where: eq(schema.user.id, value.userId),
          });
          if (!person?.active)
            throw new APIError("UNAUTHORIZED", {
              message: "Unable to sign in. Contact your website administrator.",
            });
          return { data: value };
        },
      },
    },
  },
});
