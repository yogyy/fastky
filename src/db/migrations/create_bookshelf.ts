import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("booktype")
    .asEnum(["manhwa", "manhua", "manga"])
    .execute();

  await db.schema
    .createType("bookstatus")
    .asEnum(["ongoing", "completed"])
    .execute();

  await db.schema
    .createTable("bookshelf")
    .addColumn("id", "varchar(20)", (col) => col.primaryKey())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("alternative", "varchar(255)", (col) => col.notNull())
    .addColumn("type", sql`booktype`, (col) => col.notNull())
    .addColumn("genre", sql`varchar(10)[]`, (col) => col.notNull())
    .addColumn("status", sql`bookstatus`, (col) => col.notNull())
    .addColumn("release", "date", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("bookshelf").execute();
}
