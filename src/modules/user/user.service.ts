import { db } from "@/utils/db";

async function getUser(username: string) {
  return await db
    .selectFrom("ky_user")
    .where("username", "=", username)
    .select(["email", "username", "name", "role", "uuid"])
    .executeTakeFirstOrThrow();
}

export { getUser };
