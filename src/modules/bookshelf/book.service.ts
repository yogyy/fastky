import { db } from "@/db";
import { newBookType } from "./book.schema";

async function getBooks() {
  return await db.selectFrom("bookshelf").selectAll().execute();
}

type BookPayload = { id: string } & newBookType;
async function addBook(payload: BookPayload) {
  return await db
    .insertInto("bookshelf")
    .values(payload)
    .returning("title")
    .executeTakeFirstOrThrow();
}

export { getBooks, addBook };
