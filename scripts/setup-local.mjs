import fs from "node:fs";
import crypto from "node:crypto";
fs.mkdirSync("data", { recursive: true });
if (!fs.existsSync(".env.local")) {
  fs.writeFileSync(
    ".env.local",
    `TURSO_DATABASE_URL=file:./data/church.db\nTURSO_AUTH_TOKEN=\nBETTER_AUTH_URL=http://localhost:3000\nBETTER_AUTH_SECRET=${crypto.randomBytes(48).toString("base64url")}\n`,
    { mode: 0o600 },
  );
  console.log(
    "Created .env.local with a random session secret. No default admin account was created.",
  );
} else console.log("Existing .env.local preserved.");
