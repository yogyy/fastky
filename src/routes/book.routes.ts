import {
  getBookHandler,
  newBookHandler,
} from "@/modules/bookshelf/book.controller";
import { getBook, newBook } from "@/modules/bookshelf/book.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const bookshelfRoutes: FastifyPluginAsyncTypebox = async function (app, _opts) {
  app.get("/", { schema: { querystring: getBook } }, getBookHandler);

  app.post("/add", { schema: { body: newBook } }, newBookHandler);
};

export default bookshelfRoutes;
