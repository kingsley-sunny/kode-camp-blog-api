const { describe, it } = require("mocha");
const supertest = require("supertest");
const { app } = require("../src/app");
const { StatusCodes } = require("http-status-codes");

describe("Register auth/login", function () {
  this.timeout(5000);

  it("It should throw an error: Username must be at least 3 characters", done => {
    supertest(app)
      .post("/auth/register")
      .send({
        username: "bos",
        password: "incorrect_password",
      })
      .expect(
        StatusCodes.BAD_REQUEST,
        {
          error: true,
          message: "Username must be at least 3 characters",
          statusCode: StatusCodes.BAD_REQUEST,
        },
        (err, res) => {
          done();
        }
      );
  });

  it("It should throw an error: Password must be at least 5 characters", done => {
    supertest(app)
      .post("/auth/register")
      .send({
        username: "boss_ekc",
        password: "pass",
      })
      .expect(
        StatusCodes.BAD_REQUEST,
        {
          error: true,
          message: "Password must be at least 5 characters",
          statusCode: StatusCodes.BAD_REQUEST,
        },
        (err, res) => {
          done();
        }
      );
  });

  it("It should throw Username already exists", done => {
    supertest(app)
      .post("/auth/register")
      .send({
        username: "boss_ekc",
        password: "incorrect_password",
      })
      .expect(
        StatusCodes.CONFLICT,
        { error: true, message: "Username already exists", statusCode: StatusCodes.CONFLICT },
        () => {
          done();
        }
      );
  });

  it("It should Register successfully", done => {
    supertest(app)
      .post("/auth/login")
      .send({
        username: `${Math.random().toString(36).substring(2, 15)}`,
        password: "password",
      })
      .expect(StatusCodes.CREATED, () => {
        done();
      });
  });
});
