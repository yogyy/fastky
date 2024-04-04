import { Static, Type } from "@sinclair/typebox";

export const getUser = Type.Object({
  username: Type.String({ title: "username" }),
});

export type getUserType = Static<typeof getUser>;
