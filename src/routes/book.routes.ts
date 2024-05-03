import { generateId } from "@/lib/utils";
import { newBookHandler } from "@/modules/bookshelf/book.controller";
import { newBook, newBookType } from "@/modules/bookshelf/book.schema";
import { addBook, getBooks } from "@/modules/bookshelf/book.service";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyRequest } from "fastify";

const bookshelfRoutes: FastifyPluginAsyncTypebox = async function (app, _opts) {
  app.get("/", async (req, reply) => {
    const books = await getBooks();
    reply.code(200).send(books);
  });

  app.post("/add", { schema: { body: newBook } }, newBookHandler);
};

export default bookshelfRoutes;
