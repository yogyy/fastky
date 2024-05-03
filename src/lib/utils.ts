import { nanoid } from "nanoid";
import { JWTPayload, User } from "~/types";

interface UserPayload extends Pick<User, "uuid" | "email" | "name"> {
  uuid: string | null;
}

export const generateAccToken = async (
  user: UserPayload,
  generateToken: (payload: JWTPayload) => string
) => {
  return generateToken({
    sub: user.uuid,
    email: user.email,
    name: user.name,
  });
};

export const generateId = (prefix = "", length = 20) =>
  `${prefix}_${nanoid(length)}`;
