import fastify from "fastify";
import { logger } from "./logger";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app
    .register(fastifyAutoload, {
      dir: join(process.cwd(), "src/plugins"),
      options: Object.assign({}),
    })
    .register(fastifyAutoload, {
      dir: join(process.cwd(), "src/routes"),
      options: { prefix: "/api" },
    });

  return app;
}
