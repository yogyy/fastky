import { getUserHandler } from "@/modules/user/user.controller";
import { getUser } from "@/modules/user/user.schema";
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
};
export default userRoutes;
