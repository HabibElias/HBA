import fs from "node:fs";
import crypto from "node:crypto";
fs.mkdirSync("data", { recursive: true });
if (!fs.existsSync(".env.local")) {
  fs.writeFileSync(
    ".env.local",
    `TURSO_DEVELOPMENT_DATABASE_URL=file:./data/church-development.db\nTURSO_DEVELOPMENT_AUTH_TOKEN=\nBETTER_AUTH_URL=http://localhost:3000\nBETTER_AUTH_SECRET=${crypto.randomBytes(48).toString("base64url")}\n`,
    { mode: 0o600 },
  );
  console.log(
    "Created .env.local with a random session secret. No default admin account was created.",
  );
} else console.log("Existing .env.local preserved.");
if (!fs.existsSync(".env.development.local")) {
  fs.writeFileSync(".env.development.local", "TURSO_DEVELOPMENT_DATABASE_URL=file:./data/church-development.db\nBETTER_AUTH_URL=http://localhost:3000\n", { mode: 0o600 });
  console.log("Created isolated development configuration.");
}
