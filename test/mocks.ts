const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX3V1aWQiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNzEyMjQxMDk4LCJleHAiOjE3MTIyNDE5OTh9.0EZ0VOhBGqnYUHHnDW5k-j9vaK25luAOR7Eh3aOYBbc";

const accessDeniedNoToken = {
  "statusCode": 401,
  "code": "FST_JWT_NO_AUTHORIZATION_IN_HEADER",
  "error": "Unauthorized",
  "message": "No Authorization was found in request.headers",
};

const accessDeniedTokenExpired = {
  "statusCode": 401,
  "code": "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
  "error": "Unauthorized",
  "message": "Authorization token expired",
};

const failedRegisterReqProperty = {
  "statusCode": 400,
  "code": "FST_ERR_VALIDATION",
  "error": "Bad Request",
  "message": "body must have required property 'email'",
};

const registerConflict = {
  "statusCode": 409,
  "error": "Conflict",
  "message": "Email address already exists",
};

const mockUser = {
  uuid: "user_uuid",
  email: "test@example.com",
  name: "Test User",
};

const registerMocks = {
  email: "mockk@kryptonite.stn",
  password: "supermanisdead",
  username: "mockk",
  name: "Mock User",
};

const mockBook = {
  "title": "Book test",
  "alternative": "testing add book",
  "genre": "Action, Adventure, Fantasy",
  "release": "2024-07-01",
  "status": "ongoing",
  "type": "manhwa",
};

const bookConflict = {
  "statusCode": 409,
  "error": "Conflict",
  "message": "book already exists",
};

export {
  accessDeniedNoToken,
  accessDeniedTokenExpired,
  expiredToken,
  mockUser,
  registerMocks,
  failedRegisterReqProperty,
  registerConflict,
  mockBook,
  bookConflict,
};
