import { loadEnvConfig } from "@next/env";
import { createClient, type InValue } from "@libsql/client";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");

async function main() {
  const sourceUrl = process.env.SOURCE_DATABASE_URL;
  const targetUrl = process.env.TURSO_PRODUCTION_DATABASE_URL || process.env.TURSO_DATABASE_URL;
  if (!sourceUrl?.startsWith("file:") || !targetUrl || targetUrl.startsWith("file:"))
    throw new Error("Set SOURCE_DATABASE_URL to the local file and TURSO_DATABASE_URL to the cloud destination.");
  const source = createClient({ url: sourceUrl });
  const target = createClient({ url: targetUrl, authToken: process.env.TURSO_PRODUCTION_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN });
  // Do not copy sessions or rate limits. Existing users sign in again on the new host.
  const tables = ["roles", "user", "account", "content", "media", "audit_log"];
  try {
    const tx = await target.transaction("write");
    try {
      for (const table of tables) {
        const count = await tx.execute(`SELECT COUNT(*) AS n FROM "${table}"`);
        if (Number(count.rows[0].n)) throw new Error("Import requires an empty destination. Existing cloud data was not changed.");
      }
      for (const table of tables) {
        const result = await source.execute(`SELECT * FROM "${table}"`);
        for (const row of result.rows) {
          await tx.execute({
            sql: `INSERT INTO "${table}" (${result.columns.map((c) => `"${c}"`).join(",")}) VALUES (${result.columns.map(() => "?").join(",")})`,
            args: result.columns.map((c) => row[c] as InValue),
          });
        }
        console.log(`${table}: ${result.rows.length} records copied`);
      }
      await tx.commit();
      console.log("Local content and staff imported. No active sessions were copied.");
    } finally { tx.close(); }
  } finally { source.close(); target.close(); }
}
main().catch(() => { console.error("Import failed; check connectivity and ensure the migrated destination is empty. No partial import was committed."); process.exitCode = 1; });
