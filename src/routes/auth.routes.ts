import {
  loginHandler,
  registerUserHandler,
} from "@/modules/auth/auth.controller";
import { loginSchema, registerSchema } from "@/modules/auth/auth.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const userRoutes: FastifyPluginAsyncTypebox = async function (app, _opts) {
  app.post("/login", { schema: { body: loginSchema } }, loginHandler);
  app.post(
    "/register",
    { schema: { body: registerSchema } },
    registerUserHandler
  );
};
export default userRoutes;
