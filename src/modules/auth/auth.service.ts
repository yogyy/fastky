import { db } from "@/utils/db";
import { registerType } from "./auth.schema";

async function createUser(payload: registerType) {
  return await db
    .insertInto("ky_user")
    .values(payload)
    .returning(["email", "username", "name", "role", "uuid"])
    .executeTakeFirstOrThrow();
}

async function findUser(email: string) {
  return await db
    .selectFrom("ky_user")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirstOrThrow();
}

export { createUser, findUser };
