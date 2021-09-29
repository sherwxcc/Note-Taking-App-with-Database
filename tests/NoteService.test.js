// *************************************************************** //
// Before running the test, please connect to the tester database with reference to the knexfile.js inside this "/tests" directory
// *************************************************************** //

const NoteService = require("../Service/NoteService");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Tests for valid user
describe("Note Service with a proper user and database", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    noteService = new NoteService(knex);
  });

  // Testing list note
  test("Should return a seed note from the user's note array", async () => {
    let noteQuery = await noteService.listNote("tester01");
    expect(noteQuery).toEqual([
      {
        id: 1,
        notes: "Jest",
      },
    ]);
  });

  // Testing add note
  test("Should be able to add a note in database", async () => {
    await noteService.addNote("testing", "tester01");
    let noteQuery = await noteService.listNote("tester01");
    expect(noteQuery).toEqual([
      { id: 1, notes: "Jest" },
      {
        id: 2,
        notes: "testing",
      },
    ]);
  });

  // Testing edit note
  test("Should be able to edit a note", async () => {
    await noteService.editNote("edited", 1, "tester01");
    let noteQuery = await noteService.listNote("tester01");
    expect(noteQuery).toEqual([{ id: 1, notes: "edited" }]);
  });

  // Testing delete note
  test("Should be able to delete a note", async () => {
    await noteService.deleteNote(1, "tester01");
    let noteQuery = await noteService.listNote("tester01");
    expect(noteQuery).toEqual([]);
  });
});

// Tests for invalid user
describe("Note service should throw error with an invalid user", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    noteService = new NoteService(knex);
  });

  // Testing listNote for non-existing user
  test("Should throw error for listNote of a non-existing user", async () => {
    await noteService.listNote("fakeUser").catch((err) => {
      expect(err).toEqual(new Error("User does not exist, cannot list note!"));
    });
  });

  // Testing addNote for non-existing user
  test("Should throw error for addNote of a non-existing user", async () => {
    await noteService.addNote("testing", "fakeUser").catch((err) => {
      expect(err).toEqual(new Error("User does not exist, cannot add note!"));
    });
  });

  // Testing editNote for non-existing user
  test("Should throw error for editNote for a non-existing user", async () => {
    await noteService.editNote("edited", 1, "fakeUser").catch((err) => {
      expect(err).toEqual(new Error("User does not exist, cannot edit note!"));
    });
  });

  // Testing deleteNote for non-existing user
  test("Should throw error for deleteNote for a non-existing user", async () => {
    await noteService.deleteNote(1, "fakeUser").catch((err) => {
      expect(err).toEqual(
        new Error("User does not exist, cannot delete note!")
      );
    });
  });
});
