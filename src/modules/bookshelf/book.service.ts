import { db } from "@/db";
import { newBookType } from "./book.schema";

type BookPayload = { id: string } & newBookType;

async function getBooks(currentPage: number, perPage: number) {
  return await db
    .selectFrom("bookshelf")
    .selectAll()
    .offset((currentPage - 1) * perPage)
    .limit(perPage)
    .execute();
}

async function addBook(payload: BookPayload) {
  return await db
    .insertInto("bookshelf")
    .values(payload)
    .returning("title")
    .executeTakeFirstOrThrow();
}

export { getBooks, addBook };
