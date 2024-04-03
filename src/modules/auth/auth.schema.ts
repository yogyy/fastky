import { Static, Type } from "@sinclair/typebox";

export const loginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
});

export const registerSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
  username: Type.String({ minLength: 3 }),
  name: Type.String({ minLength: 3 }),
});

export type registerType = Static<typeof registerSchema>;
export type loginType = Static<typeof loginSchema>;
