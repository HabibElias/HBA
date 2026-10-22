import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const databaseUrl = process.env.TURSO_DATABASE_URL;
if (!databaseUrl)
  throw new Error(
    "TURSO_DATABASE_URL is required. Run npm run setup:local or configure Turso as described in ADMIN.md.",
  );
export const client = createClient({
  url: databaseUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client, { schema });
