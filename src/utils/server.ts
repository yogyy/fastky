import fastify from "fastify";
import { logger } from "./logger";

import "dotenv/config";

export default async function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(import("@/plugins/auth"));
  app
    .register(import("@/routes/root"), { prefix: "/api" })
    .register(import("@/routes/auth.routes"), { prefix: "/api/auth" })
    .register(import("@/routes/user.routes"), { prefix: "/api/user" })
    .register(import("@/routes/book.routes"), { prefix: "/api/book" });

  return app;
}
