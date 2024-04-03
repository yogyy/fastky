import { FastifyReply, FastifyRequest } from "fastify";
import { loginType, registerType } from "./auth.schema";
import { createUser, findUser } from "./auth.service";
import { Argon2id } from "oslo/password";
import { DatabaseError } from "pg";
import { NoResultError } from "kysely";

export async function loginHandler(
  req: FastifyRequest<{ Body: loginType }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  const argon = new Argon2id();
  try {
    req.log.info("Create token by login");

    const user = await findUser(email);

    const verified = await argon.verify(user.password, password);

    if (!verified) {
      return reply.code(401).send({
        error: "Incorrect password",
      });
    }

    const payload = {
      sub: user.uuid,
      email: user.email,
      name: user.name,
    };

    const token = await reply.jwtSign(payload);
    reply.code(200).send({
      success: true,
      message: "Login successful",
      data: {
        user: user,
      },
      access_token: token,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof NoResultError) {
      if (err.message === "no result") {
        reply.code(404).send({ error: "User Not Found" });
      }
    } else {
      reply.code(500).send(err);
    }
  }
}

export async function registerUserHandler(
  req: FastifyRequest<{ Body: registerType }>,
  reply: FastifyReply
) {
  const { email, password, username, name } = req.body;
  const argon = new Argon2id();

  try {
    const hashPass = await argon.hash(password);

    const newUser = await createUser({
      email,
      password: hashPass,
      username,
      name,
    });

    const payload = {
      sub: newUser.uuid,
      email: newUser.email,
      name: newUser.name,
    };
    const token = await reply.jwtSign(payload);

    reply.code(200).send({
      success: true,
      message: "User created successfully",
      data: newUser,
      access_token: token,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof DatabaseError) {
      if (err.code === "23505") {
        const errorMessage =
          err.constraint === "ky_user_email_key" ? "Email address" : "Username";
        reply.code(400).send({ error: `${errorMessage} already exists` });
      }
    } else {
      reply.code(500).send({ err });
    }
  }
}
