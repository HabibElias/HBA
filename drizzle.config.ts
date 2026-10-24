import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { databaseConfig } from "./lib/db/config";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: databaseConfig(),
});
