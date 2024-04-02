import {
  getUserByidHandler,
  registerUserHandler,
} from "@/src/modules/user/user.controller";
import { getUser } from "@/src/modules/user/user.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const userRoutes: FastifyPluginAsyncTypebox = async function (app, _opts) {
  app.get(":id", { schema: { querystring: getUser } }, getUserByidHandler);

  app.post("/register", registerUserHandler);
};
export default userRoutes;
