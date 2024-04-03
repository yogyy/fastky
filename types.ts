import { JWT } from "@fastify/jwt";
import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface User {
  id: Generated<number>;
  uuid: Generated<string | null>;
  email: string;
  username: string;
  name: string;
  password: string;
  is_active: Generated<boolean>;
  role: Generated<"developer" | "user" | "verified">;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  ky_user: User;
}

export interface JWTPayload {
  id: number | string;
  email: string;
  name: string;
}

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    generateToken(payload: JWTPayload): string;
  }
  export interface FastifyInstance {
    auth: any;
  }
}
