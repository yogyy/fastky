import { db } from "@/db";

async function getUser(username: string) {
  return await db
    .selectFrom("ky_user")
    .where("username", "=", username)
    .select(["email", "username", "name", "role", "uuid"])
    .executeTakeFirstOrThrow();
}

async function deleteUser(email: string) {
  await db.deleteFrom("ky_user").where("email", "=", email).execute();
}
export { getUser, deleteUser };
