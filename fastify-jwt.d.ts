import "@fastify/jwt";
import { JWTPayload } from "./types";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTPayload;
    user: {
      sub: string;
      email: string;
      name: string;
      iat: number;
      exp: number;
    };
  }
}
