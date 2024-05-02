import { JWT } from "@fastify/jwt";
import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type Bookstatus = "completed" | "ongoing";
export type Booktype = "manga" | "manhua" | "manhwa";

export interface User {
  id: Generated<number>;
  uuid: string | null | Generated<string | null>;
  email: string;
  username: string;
  name: string;
  password: string;
  is_active: Generated<boolean>;
  role: Generated<"developer" | "user" | "verified">;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Bookshelf {
  alternative: string;
  genre: string[];
  id: string;
  release: Timestamp;
  status: Bookstatus;
  title: string;
  type: Booktype;
}

export interface DB {
  ky_user: User;
  bookshelf: Bookshelf;
}

export interface JWTPayload {
  sub: string | null;
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
