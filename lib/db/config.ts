import path from "node:path";

function databaseIdentity(value: string) {
  if (value.startsWith("file:")) {
    if (value === "file::memory:") return value;
    const resolved = path.resolve(
      decodeURIComponent(value.slice(5).split("?")[0]),
    );
    return process.platform === "win32" ? resolved.toLowerCase() : resolved;
  }
  const url = new URL(value);
  return `${url.hostname.toLowerCase()}:${url.port || "443"}${url.pathname.replace(/\/$/, "")}`;
}

/** Development never falls back to the deployed database credentials. */
export function databaseConfig(env: NodeJS.ProcessEnv = process.env) {
  const production =
    env.NODE_ENV === "production" || env.DATABASE_ENV === "production";
  const productionUrl =
    env.TURSO_PRODUCTION_DATABASE_URL || env.TURSO_DATABASE_URL;
  if (production) {
    if (!productionUrl)
      throw new Error(
        "Configure TURSO_PRODUCTION_DATABASE_URL for production.",
      );
    if (
      databaseIdentity(productionUrl) ===
      databaseIdentity(
        env.TURSO_DEVELOPMENT_DATABASE_URL ||
          "file:./data/church-development.db",
      )
    )
      throw new Error(
        "Development and production databases must be different.",
      );
    return {
      url: productionUrl,
      authToken: env.TURSO_PRODUCTION_AUTH_TOKEN || env.TURSO_AUTH_TOKEN,
    };
  }
  // Test fixtures explicitly request an in-memory database.
  if (env.TURSO_DATABASE_URL === "file::memory:")
    return { url: "file::memory:" };
  const url =
    env.TURSO_DEVELOPMENT_DATABASE_URL || "file:./data/church-development.db";
  if (
    productionUrl &&
    databaseIdentity(url) === databaseIdentity(productionUrl)
  )
    throw new Error("Development and production databases must be different.");
  return { url, authToken: env.TURSO_DEVELOPMENT_AUTH_TOKEN };
}
