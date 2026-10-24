import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");
async function main() {
  const { db, client } = await import("../lib/db");
  const { migrate } = await import("drizzle-orm/libsql/migrator");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Database migrations applied.");
  client.close();
}
main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exitCode = 1;
});
