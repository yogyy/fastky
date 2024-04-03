import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "~/types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "kysely",
    host: "localhost",
    user: "postgres",
    password: "root",
    port: 5432,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
