const express = require("express");

class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:index", this.put.bind(this));
    router.delete("/:index", this.delete.bind(this));
    return router;
  }

  get(req, res) {
    this.noteService
      .listNote(req.auth.user)
      .then((notesData) => {
        res.json(notesData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  post(req, res) {
    this.noteService.addNote(req.body.note, req.auth.user).then(() => {
      this.noteService
        .listNote(req.auth.user)
        .then((notesData) => {
          res.json(notesData);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }

  put(req, res) {
    this.noteService
      .editNote(req.body.note, req.params.index, req.auth.user)
      .then(() => {
        this.noteService
          .listNote(req.auth.user)
          .then((notesData) => {
            res.json(notesData);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
  }

  delete(req, res) {
    this.noteService.deleteNote(req.params.index, req.auth.user).then(() => {
      this.noteService
        .listNote(req.auth.user)
        .then((notesData) => {
          res.json(notesData);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }
}

module.exports = NoteRouter;
