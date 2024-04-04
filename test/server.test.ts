import { afterAll, expect, test } from "vitest";
import supertest from "supertest";
import buildServer from "@/utils/server";

test("with HTTP injection", async () => {
  const app = await buildServer();
  const res = await app.inject({
    method: "GET",
    url: "/api/ping",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toBe("pong");
});

test("with a running server", async (t) => {
  const app = await buildServer();
  await app.ready();

  const res = await supertest(app.server).get("/api/ping");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("pong");
});

afterAll(async () => {
  (await buildServer()).close();
});
