import { FastifyReply, FastifyRequest } from "fastify";
import { newBookType } from "./book.schema";
import { generateId } from "@/lib/utils";
import { addBook } from "./book.service";
import { DatabaseError } from "pg";

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
