import { Static, Type } from "@sinclair/typebox";

export const newBook = Type.Object({
  title: Type.String(),
  alternative: Type.String(),
  genre: Type.Array(Type.String()),
  status: Type.Union([Type.Literal("completed"), Type.Literal("ongoing")]),
  release: Type.String(),
  type: Type.Union([
    Type.Literal("manga"),
    Type.Literal("manhua"),
    Type.Literal("manhwa"),
  ]),
});

export type newBookType = Static<typeof newBook>;
