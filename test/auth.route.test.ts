import { afterAll, expect, test, describe } from "vitest";
import supertest from "supertest";
import buildServer from "@/utils/server";
import {
  failedRegisterReqProperty,
  registerConflict,
  registerMocks,
} from "./mocks";

describe("POST /api/auth/register", async () => {
  const app = await buildServer();
  await app.ready();

  test("should successfully register user", async () => {
    const res = await supertest(app.server)
      .post("/api/auth/register")
      .send(registerMocks);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "User created successfully",
        data: expect.objectContaining({
          email: expect.any(String),
          username: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          uuid: expect.any(String),
        }),
        access_token: expect.any(String),
      })
    );
  });

  test("should return 400 when required fields are not passed", async () => {
    const res = await supertest(app.server).post("/api/auth/register").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(failedRegisterReqProperty);
  });

  test("should return 409 when email/username already exists", async () => {
    const existingUser = registerMocks;

    const res = await supertest(app.server)
      .post("/api/auth/register")
      .send(existingUser);

    expect(res.statusCode).toBe(409);
    expect(res.body).toStrictEqual(registerConflict);
  });
});

describe("POST /api/auth/login", async () => {
  const app = await buildServer();
  await app.ready();
  test("should successfully log in with valid credentials", async () => {
    const res = await supertest(app.server).post("/api/auth/login").send({
      email: registerMocks.email,
      password: registerMocks.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Login successful",
        data: expect.objectContaining({
          email: expect.any(String),
          username: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          uuid: expect.any(String),
        }),
        access_token: expect.any(String),
      })
    );
  });

  test("should return 401 when login with invalid credentials", async () => {
    const invalidCredentials = {
      email: registerMocks.email,
      password: "invalidpassword",
    };

    const res = await supertest(app.server)
      .post("/api/auth/login")
      .send(invalidCredentials);

    expect(res.statusCode).toBe(401);
    expect(res.body).toStrictEqual({
      statusCode: 401,
      error: "Unauthorized",
      message: "Invalid Email or Password",
    });
  });
});

test("should delete mock account", async () => {
  const app = await buildServer();
  await app.ready();

  const res = await supertest(app.server)
    .delete("/api/user/delete")
    .send({ email: registerMocks.email });

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({
    message: "success delete",
  });
});

afterAll(async () => {
  (await buildServer()).close();
});
