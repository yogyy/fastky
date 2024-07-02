import { FastifyReply, FastifyRequest } from "fastify";
import { getBookType, newBookType } from "./book.schema";
import { generateId } from "@/lib/utils";
import { addBook, getBooks } from "./book.service";
import { DatabaseError } from "pg";
import { db } from "@/db";
import { sql } from "kysely";

interface Paginate extends getBookType {}

export async function getBookHandler(
  req: FastifyRequest<{ Querystring: Paginate }>,
  reply: FastifyReply
) {
  try {
    const currentPage = req.query.page;
    const perPage = req.query.per_page;

    const { rows } = await db.executeQuery(
      sql`SELECT COUNT(*) from bookshelf;`.compile(db)
    );

    const books = await getBooks(currentPage, perPage);

    const totalBooks = rows as [{ count: string }];

    reply.code(200).send({
      data: books,
      total_data: parseInt(totalBooks[0].count),
      per_page: perPage,
      current_page: currentPage,
    });
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function newBookHandler(
  req: FastifyRequest<{ Body: newBookType }>,
  reply: FastifyReply
) {
  try {
    const bookId = generateId("book");
    const newBook = await addBook({ id: bookId, ...req.body });

    reply.code(200).send(newBook);
  } catch (err) {
    console.log(err);
    if (err instanceof DatabaseError) {
      if (err.code === "23505") {
        return reply.code(409).send(new Error("book already exists"));
      }
    }
    reply.code(500).send(err);
  }
}
