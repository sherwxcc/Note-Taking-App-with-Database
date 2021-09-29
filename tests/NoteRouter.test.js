const NoteRouter = require("../Router/NoteRouter");

let noteService;
let response;
let noteRouter;

describe("NoteRouter with a function noteService", () => {
  beforeEach(() => {
    noteService = {
      listNote: jest.fn().mockResolvedValue(true),
      addNote: jest.fn().mockResolvedValue(true),
      deleteNote: jest.fn().mockResolvedValue(true),
      editNote: jest.fn().mockResolvedValue(true),
    };
    noteRouter = new NoteRouter(noteService);

    response = {
      status: jest.fn().mockResolvedValue(200),
      json: () => {
        return "Error";
      },
    };
  });

  // Testing GET route
  test("Should call listNote in response to a GET request", () => {
    noteRouter.get(
      {
        auth: {
          user: "sher",
        },
      },
      response
    );
    expect(noteService.listNote).toHaveBeenCalledWith("sher");
  });

  // Testing POST route
  test("Should call addNote in response to a POST request", () => {
    noteRouter.post(
      {
        auth: {
          user: "sher",
        },
        body: {
          note: "testing",
        },
      },
      response
    );
    expect(noteService.addNote).toHaveBeenCalledWith("testing", "sher");
    expect(response.status).not.toHaveBeenCalled();
  });

  // Testing PUT route
  test("Should call editNote in response to a PUT request", () => {
    noteRouter.put(
      {
        auth: {
          user: "sher",
        },
        body: {
          note: "testing",
        },
        params: {
          index: 0,
        },
      },
      response
    );
    expect(noteService.editNote).toHaveBeenCalledWith("testing", 0, "sher");
    expect(response.status).not.toHaveBeenCalled();
  });

  // Testing DELETE route
  test("Should call deleteNote in response to a DELETE request", () => {
    noteRouter.delete(
      {
        auth: {
          user: "sher",
        },

        params: {
          index: 0,
        },
      },
      response
    );
    expect(noteService.deleteNote).toHaveBeenCalledWith(0, "sher");
    expect(response.status).not.toHaveBeenCalled();
  });
});
