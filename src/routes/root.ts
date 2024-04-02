import { FastifyInstance, FastifyServerOptions } from "fastify";

export default async function (
  app: FastifyInstance,
  opts: FastifyServerOptions
) {
  app.get("/ping", (req, reply) => {
    reply.send("pong");
  });
}
