import fastify from "fastify";
import { logger } from "./logger";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";
import authPlugins from "@/plugins/auth";
import "dotenv/config";

export default async function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(authPlugins);
  app
    .register(import("@/routes/root"), { prefix: "/api" })
    .register(import("@/routes/auth/index"), { prefix: "/api/auth" })
    .register(import("@/routes/user/index"), { prefix: "/api/user" });

  return app;
}
