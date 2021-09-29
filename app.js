// Require node modules
const express = require("express");
const app = express();
const path = require("path");

// Set up knex with postgreSQL database
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up basic auth
const myAuthorizer = require("./Authorizer/myAuthorizer");
const basicAuth = require("express-basic-auth");
app.use(
  basicAuth({
    authorizeAsync: true,
    authorizer: myAuthorizer(knex),
    challenge: true,
  })
);

// Set up static folder & middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, path.sep, "public")));

// Set up note service and router
const NoteService = require("./Service/NoteService");
const NoteRouter = require("./Router/NoteRouter");
const noteService = new NoteService(knex);
const noteRouter = new NoteRouter(noteService);

// Set up port
const port = 8080;
app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

// Home-page route
app.get("/", (req, res) => {
  noteService.listNote(req.auth.user).then((notesDataParsed) => {
    res.render("home", {
      user: req.auth.user,
      notes: notesDataParsed,
    });
  });
});

// Note-data route
app.use("/api/notes", noteRouter.router());

module.exports = app;
