import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("bookshelf")
    .alterColumn("id", (col) => col.setDataType("varchar(100)"))
    .alterColumn("genre", (col) => col.setDataType(sql`varchar(100)[]`))
    .execute();
}
