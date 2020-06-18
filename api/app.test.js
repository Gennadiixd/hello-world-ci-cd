const request = require("supertest");
const { app } = require("./app");

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    agent = request.agent(server);
    done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});

describe("App", () => {
  it('should respond "Hello World" ', async (done) => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World!");
    done();
  });
});
