const { describe, it } = require("mocha");
const supertest = require("supertest");
const { app } = require("../src/app");
const { StatusCodes } = require("http-status-codes");

describe("Login auth/login", function () {
  this.timeout(5000);

  it("It should throw an invalid password error", done => {
    supertest(app)
      .post("/auth/login")
      .send({
        username: "boss_ekc",
        password: "incorrect_password",
      })
      .expect(
        StatusCodes.UNAUTHORIZED,
        { error: true, message: "Invalid password", statusCode: StatusCodes.UNAUTHORIZED },
        () => {
          done();
        }
      );
  });

  it("It should throw a User not found error", done => {
    supertest(app)
      .post("/auth/login")
      .send({
        username: "boss_ekcs",
        password: "password",
      })
      .expect(
        StatusCodes.NOT_FOUND,
        { error: true, message: "User not found", statusCode: StatusCodes.NOT_FOUND },
        () => {
          done();
        }
      );
  });

  it("It should login successful", done => {
    supertest(app)
      .post("/auth/login")
      .send({
        username: "boss_ekc",
        password: "password",
      })
      .expect(StatusCodes.OK, () => {
        done();
      });
  });
});
