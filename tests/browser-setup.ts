import { copyFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { hashPassword } from "better-auth/crypto";
async function main() {
  const filename = `cms-browser-${crypto.randomUUID()}.db`;
  copyFileSync(path.resolve("data/church.db"), path.resolve("data", filename));
  process.env.TURSO_DATABASE_URL = `file:./data/${filename}`;
  delete process.env.TURSO_AUTH_TOKEN;
  const { db, client } = await import("../lib/db");
  const { user, account } = await import("../lib/db/schema");
  const users = [];
  for (const roleId of ["owner", "administrator", "editor", "viewer"]) {
    const id = crypto.randomUUID(),
      password = crypto.randomUUID() + "!Qa",
      email = `${roleId}@example.test`,
      name = `QA ${roleId.charAt(0).toUpperCase() + roleId.slice(1)}`,
      now = new Date();
    await db
      .insert(user)
      .values({
        id,
        name,
        email,
        emailVerified: true,
        roleId,
        createdAt: now,
        updatedAt: now,
      });
    await db
      .insert(account)
      .values({
        id: crypto.randomUUID(),
        accountId: id,
        providerId: "credential",
        userId: id,
        password: await hashPassword(password),
        createdAt: now,
        updatedAt: now,
      });
    users.push({ id, email, password, roleId });
  }
  writeFileSync(
    path.join(tmpdir(), "summit-browser-qa.json"),
    JSON.stringify({
      databaseUrl: process.env.TURSO_DATABASE_URL,
      secret: crypto.randomUUID() + crypto.randomUUID(),
      users,
    }),
    { mode: 0o600 },
  );
  client.close();
  console.log(
    "Isolated browser-test database prepared. Test credentials are stored only in a temporary local file.",
  );
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
