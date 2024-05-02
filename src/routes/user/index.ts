import {
  deleteUserHandler,
  getUserHandler,
} from "@/modules/user/user.controller";
import { deleteUser, getUser } from "@/modules/user/user.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const userRoutes: FastifyPluginAsyncTypebox = async function (app, _opts) {
  app.get(
    ":username",
    { onRequest: [app.auth], schema: { querystring: getUser } },
    getUserHandler
  );

  app.get("/me", { onRequest: [app.auth] }, (req, reply) => {
    reply.send(req.user);
  });

  app.delete("/delete", { onRequest: [app.auth] }, deleteUserHandler);
};
export default userRoutes;
