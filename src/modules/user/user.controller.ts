import { FastifyReply, FastifyRequest } from "fastify";
import { deleteUser, getUser } from "./user.service";
import { deleteUserType, getUserType } from "./user.schema";

export async function getUserHandler(
  req: FastifyRequest<{ Querystring: getUserType }>,
  reply: FastifyReply
) {
  const username = req.query.username;
  if (!username) {
    return reply.callNotFound();
  }
  req.log.info("Get User by username");
  try {
    const user = await getUser(username);

    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }

    reply.code(200).send(user);
  } catch (err) {
    console.log(err);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function deleteUserHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = req.user;

  await deleteUser(email);

  reply.code(200).send({ success: true, message: "user deleted" });
}
