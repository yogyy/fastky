import { FastifyReply, FastifyRequest } from "fastify";
import { loginType, registerType } from "./auth.schema";
import { createUser, findUser } from "./auth.service";
import { Argon2id } from "oslo/password";
import { DatabaseError } from "pg";
import { NoResultError } from "kysely";
import { generateAccToken } from "./lib";

const argon = new Argon2id();

export async function loginHandler(
  req: FastifyRequest<{ Body: loginType }>,
  reply: FastifyReply
): Promise<void> {
  const { email, password } = req.body;

  try {
    req.log.info("User Login");

    const user = await findUser(email);

    const verified = await argon.verify(user.password, password);

    if (!verified) {
      return reply.code(401).send(new Error("Invalid Email or Password"));
    }

    const token = await generateAccToken(user, req.generateToken);

    reply.code(200).send({
      success: true,
      message: "Login successful",
      data: {
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        uuid: user.uuid,
      },
      access_token: token,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof NoResultError) {
      if (err.message === "no result") {
        return reply.code(404).send(new Error("User Not Found"));
      }
    } else {
      reply.code(500).send(err);
    }
  }
}

export async function registerUserHandler(
  req: FastifyRequest<{ Body: registerType }>,
  reply: FastifyReply
): Promise<void> {
  const { email, password, username, name } = req.body;

  try {
    req.log.info("User Register");

    const hashPass = await argon.hash(password);

    const newUser = await createUser({
      email,
      password: hashPass,
      username,
      name,
    });

    const token = await generateAccToken(newUser, req.generateToken);

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
        return reply
          .code(409)
          .send(new Error(`${errorMessage} already exists`));
      }
    } else {
      reply.code(500).send(err);
    }
  }
}
