// *************************************************************** //
// Before running the test, please connect to the tester database with reference to the knexfile.js inside this "/tests" directory
// *************************************************************** //

const request = require("supertest");
const app = require("../app");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

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
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  xtest("Authorized user: Should return 404 if the route is incorrect", (done) => {
    // let auth = "Basic c2hlcm1hbjoxMjM=";
    request(app)
      .get("/randompath")
      .auth("sherman", "123")
      // .set("Authorization", auth)
      .expect(404, done);
  });

  xtest("Authorized user: GET'/' Should return the index page", async () => {
    // For tester01 123
    // let auth = "Basic dGVzdGVyMDEgMTIz";
    await request(app)
      .get("/")
      // .set("Authorization", auth)
      .auth("tester01", "123")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
  });
});
