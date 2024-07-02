import { afterAll, expect, test, describe } from "vitest";
import supertest from "supertest";
import buildServer from "@/utils/server";
import { bookConflict, mockBook } from "./mocks";

const dataResponse = expect.arrayContaining([
  expect.objectContaining({
    id: expect.any(String),
    title: expect.any(String),
    alternative: expect.any(String),
    type: expect.any(String),
    genre: expect.any(Array),
    status: expect.any(String),
    release: expect.any(String),
  }),
]);

describe("GET /api/book", async () => {
  const app = await buildServer();
  await app.ready();

  test("should successfully get books without using query param", async () => {
    const res = await supertest(app.server).get("/api/book");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        data: dataResponse,
        total_data: expect.any(Number),
        per_page: expect.any(Number),
        current_page: expect.any(Number),
      })
    );
  });

  test("should return validation error when query param not number", async () => {
    const res = await supertest(app.server).get(
      "/api/book?page=five&per_page=two"
    );

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      "code": "FST_ERR_VALIDATION",
      "error": "Bad Request",
      "message": "querystring/page must be number",
      "statusCode": 400,
    });
  });

  test("should return data per_page length", async () => {
    let per_page = 4;
    const res = await supertest(app.server).get(
      `/api/book?per_page=${per_page}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        data: dataResponse,
        total_data: expect.any(Number),
        per_page,
        current_page: expect.any(Number),
      })
    );
    expect(res.body.data).toHaveLength(per_page);
  });
});

describe("POST /api/book/add", async () => {
  const app = await buildServer();
  await app.ready();

  test("should success add new book", async () => {
    const res = await supertest(app.server)
      .post("/api/book/add")
      .send(mockBook);

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ title: "Book test" });
  });

  test("should error when book title already exist", async () => {
    const res = await supertest(app.server)
      .post("/api/book/add")
      .send(mockBook);

    expect(res.statusCode).toBe(409);
    expect(res.body).toStrictEqual(bookConflict);
  });
});

afterAll(async () => {
  (await buildServer()).close();
});
