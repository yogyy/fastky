import { afterAll, expect, test, describe } from "vitest";
import supertest from "supertest";
import buildServer from "@/utils/server";
import { generateAccToken } from "@/modules/auth/lib";
import {
  accessDeniedNoToken,
  accessDeniedTokenExpired,
  expiredToken,
  mockUser,
} from "./mocks";

let token = "";

test("should generate access_token", async () => {
  const app = await buildServer();
  await app.ready();

  token = await generateAccToken(mockUser, app.jwt.sign);
  expect(token).toBeDefined();
});

describe("GET /api/user/me", async () => {
  const app = await buildServer();
  await app.ready();

  test("should allow access with a valid access token", async () => {
    const res = await supertest(app.server)
      .get("/api/user/me")
      .set({ authorization: `Bearer ${token}` });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        sub: "user_uuid",
        email: "test@example.com",
        name: "Test User",
        iat: expect.any(Number),
      })
    );
  });

  test("should deny access when no token is passed", async () => {
    const res = await supertest(app.server).get("/api/user/me");
    expect(res.statusCode).toBe(401);
    expect(res.body).toStrictEqual(accessDeniedNoToken);
  });

  test("should deny access when token is expired", async () => {
    const res = await supertest(app.server)
      .get("/api/user/me")
      .set({ authorization: `Bearer ${expiredToken}` });
    expect(res.statusCode).toBe(401);
    expect(res.body).toStrictEqual(accessDeniedTokenExpired);
  });
});

describe("GET /api/user:username", async () => {
  const app = await buildServer();
  await app.ready();
  test("should allow access with a valid access token", async () => {
    const res = await supertest(app.server)
      .get("/api/user:username")
      .query({ username: "lex" })
      .set({ authorization: `Bearer ${token}` });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        username: expect.any(String),
        name: expect.any(String),
        role: expect.any(String),
        uuid: expect.any(String),
      })
    );
  });
});

afterAll(async () => {
  (await buildServer()).close();
});
