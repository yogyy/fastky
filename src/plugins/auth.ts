import fp from "fastify-plugin";
import JWT from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import { JWTPayload } from "~/types";

export default fp(async function (fastify, opts) {
  await fastify.register(JWT, {
    secret: process.env.JWT_SECRET!,
    sign: {
      expiresIn: "15m",
    },
  });

  fastify.decorate(
    "auth",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.decorateRequest("generateToken", function (payload: JWTPayload) {
    const token = fastify.jwt.sign({
      ...payload,
    });
    return token;
  });

  fastify.register(import("@fastify/cors"), {
    origin: true,
    credentials: true,
  });
});
