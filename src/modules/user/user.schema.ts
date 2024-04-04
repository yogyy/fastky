import { Static, Type } from "@sinclair/typebox";

export const getUser = Type.Object({
  username: Type.String({ title: "username" }),
});

export const deleteUser = Type.Object({
  email: Type.String({ format: "email" }),
});

export type deleteUserType = Static<typeof deleteUser>;
export type getUserType = Static<typeof getUser>;
