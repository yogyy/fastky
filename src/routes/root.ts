import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.get("/ping", (req, reply) => {
    reply.send("pong");
  });
}
