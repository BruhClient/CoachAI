import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
const client = neon(env.AUTH_DRIZZLE_URL);
export const db = drizzle(client, { schema });
