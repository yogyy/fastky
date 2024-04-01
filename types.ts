import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface User {
  bannerUrl: string | null;
  bio: string | null;
  birthDate: Timestamp | null;
  createdAt: Generated<Timestamp>;
  id: string;
  imageUrl: string;
  location: string | null;
  name: string;
  type: Generated<"developer" | "user" | "verified">;
  updatedAt: Timestamp;
  username: string;
  website: string | null;
}

export interface DB {
  user: User;
}
