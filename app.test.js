const request = require("supertest");
const { app } = require("./app");

describe("App", () => {
  it('should respond "Hello World" ', async () => {
    const res = await request(app).get("/").send("Hello World");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World!");
  });
});
