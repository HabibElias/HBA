import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { databaseConfig } from "./config";

export const client = createClient(databaseConfig());
export const db = drizzle(client, { schema });
