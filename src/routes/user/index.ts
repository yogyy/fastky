import { getUserHandler } from "@/modules/user/user.controller";
import { deleteUser, getUser } from "@/modules/user/user.schema";
import { db } from "@/utils/db";
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

  app.delete(
    "/delete",
    { schema: { body: deleteUser } },
    async (req, reply) => {
      const { email } = req.body;

      await db.deleteFrom("ky_user").where("email", "=", email).execute();

      reply.code(200).send({ message: "success delete" });
    }
  );
};
export default userRoutes;
