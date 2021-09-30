const request = require("supertest");
const app = require("../app");

// Testing for Routes with no username and password
describe("Routes tests without username and password", () => {
  test("GET'/': Should return 401 if no username and password given", (done) => {
    request(app)
      .get("/")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET'/api/notes': Should return 401 if no username and password given", (done) => {
    request(app)
      .get("/api/notes")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("POST'/api/notes': Should return 401 if no username and password given", (done) => {
    request(app)
      .post("/api/notes")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("PUT'/api/notes/1': Should return 401 if no username and password given", (done) => {
    request(app)
      .put("/api/notes/1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("DELETE'/api/notes/1': Should return 401 if no username and password given", (done) => {
    request(app)
      .delete("/api/notes/1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

// Testing for routes with valid username and password
describe("Routes tests with username and password", () => {
  test("Authorized user: Should return 404 if the route is incorrect", (done) => {
    request(app).get("/randompath").auth("sherman", "123").expect(404);
    done();
  });

  test("Authorized user: GET'/' Should return the index page", (done) => {
    request(app)
      .get("/")
      .auth("sherman", "123")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
    done();
  });
});
