const superTestRequest = require("supertest");
const mocha = require("mocha");
const { app } = require("../src/app");
const { StatusCodes } = require("http-status-codes");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmIyOTgzODk1MmRlYzUzNTI3ZmE1NiIsInVzZXJuYW1lIjoiYm9zc19la2MiLCJpYXQiOjE2OTg3NjMwMDcsImV4cCI6MTY5ODkzNTgwN30.aiHKgLEtRx4Z6hRxK9c4RPG8iK4hPcn3o62YwR-U1mY`;

const correctPostId = "651597afbf7af9d734530eea";
const inCorrectPostId = "651597afbf7af9d734530eed";

describe("Post /posts", function () {
  this.timeout(5000);
  it("It should fetch all post", done => {
    superTestRequest(app).get("/posts").expect(200, done);
  });

  it("It should throw and error if there is no authorization token to get a single post", done => {
    superTestRequest(app)
      .get(`/posts/${correctPostId}`)
      .expect(
        StatusCodes.UNAUTHORIZED,
        { error: true, message: "Unauthorized!", statusCode: StatusCodes.UNAUTHORIZED },
        (err, res) => {
          done();
        }
      );
  });

  it("It should throw not found error if the post is not found", done => {
    superTestRequest(app)
      .get(`/posts/${inCorrectPostId}`)
      .auth(token, { type: "bearer" })
      .expect(StatusCodes.NOT_FOUND, (err, res) => {
        done();
      });
  });

  // This test uses the token to test it, you can get the token by login in if you have an account
  it("It should successfully get the post", done => {
    superTestRequest(app)
      .get(`/posts/${correctPostId}`)
      .auth(token, { type: "bearer" })
      .expect(StatusCodes.OK, (err, res) => {
        done();
      });
  });
});