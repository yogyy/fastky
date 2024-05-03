import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("bookshelf")
    .addUniqueConstraint("unique_title", ["title"])
    .execute();
}
