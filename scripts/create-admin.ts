import { loadEnvConfig } from "@next/env";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { hashPassword } from "better-auth/crypto";
import { z } from "zod";
loadEnvConfig(process.cwd(), process.env.DATABASE_ENV !== "production");
async function main() {
  if (!process.stdin.isTTY)
    throw new Error(
      "Run admin:create in an interactive terminal. Passwords are entered privately, not as command arguments.",
    );
  const { db, client } = await import("../lib/db");
  const { user, account, roles, auditLog } = await import("../lib/db/schema");
  const { defaultRoles } = await import("../lib/cms/permissions");
  let hidden = false;
  const output = new Writable({
    write(chunk, _encoding, callback) {
      if (!hidden) process.stdout.write(chunk);
      callback();
    },
  });
  const prompt = createInterface({
    input: process.stdin,
    output,
    terminal: true,
  });
  try {
    const name = z
      .string()
      .trim()
      .min(2)
      .max(100)
      .parse(await prompt.question("Owner name: "));
    const email = z
      .email()
      .parse((await prompt.question("Owner email: ")).trim().toLowerCase());
    process.stdout.write("Password (12–128 characters; hidden): ");
    hidden = true;
    const password = await prompt.question("");
    hidden = false;
    process.stdout.write("\n");
    z.string().min(12).max(128).parse(password);
    process.stdout.write("Confirm password: ");
    hidden = true;
    const confirm = await prompt.question("");
    hidden = false;
    process.stdout.write("\n");
    if (password !== confirm) throw new Error("Passwords do not match.");
    const passwordHash = await hashPassword(password),
      id = crypto.randomUUID(),
      now = new Date();
    await db.transaction(async (tx) => {
      for (const role of defaultRoles)
        await tx
          .insert(roles)
          .values({ ...role, builtIn: true })
          .onConflictDoNothing();
      await tx
        .insert(user)
        .values({
          id,
          name,
          email,
          emailVerified: true,
          roleId: "owner",
          createdAt: now,
          updatedAt: now,
        });
      await tx
        .insert(account)
        .values({
          id: crypto.randomUUID(),
          accountId: id,
          providerId: "credential",
          userId: id,
          password: passwordHash,
          createdAt: now,
          updatedAt: now,
        });
      await tx
        .insert(auditLog)
        .values({
          id: crypto.randomUUID(),
          actorId: id,
          actorName: name,
          action: "owner.created",
          target: id,
          detail: "Owner provisioned through the local administration command.",
          createdAt: now,
        });
    });
    console.log("Owner created. Sign in at /admin/login.");
  } finally {
    hidden = false;
    prompt.close();
    client.close();
  }
}
main().catch((error) => {
  console.error("Could not create owner:", error.message);
  process.exitCode = 1;
});
