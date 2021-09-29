class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  async getUserID(user) {
    try {
      let userQuery = await this.knex
        .select("id")
        .from("users")
        .where("username", "=", user);
      return userQuery[0].id;
    } catch (err) {
      throw err;
    }
  }

  async listNote(user) {
    try {
      let userID = await this.getUserID(user);
      let noteQuery = await this.knex
        .select("id", "note")
        .from("notes")
        .where("user_id", "=", userID)
        .orderBy("id", "asc");
      let noteData = {};
      let noteArr = [];
      noteQuery.forEach((note) => {
        noteArr.push({
          id: note.id,
          notes: note.note,
        });
      });
      noteData[user] = noteArr;
      return noteData[user];
    } catch (err) {
      throw err;
    }
  }

  async addNote(note, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex.insert({ note: note, user_id: userID }).into("notes");
    } catch (err) {
      throw err;
    }
  }

  async editNote(note, index, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex("notes")
        .where("user_id", "=", userID)
        .andWhere("id", "=", index)
        .update({ note: note });
    } catch (err) {
      throw err;
    }
  }

  async deleteNote(index, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex("notes")
        .where("user_id", "=", userID)
        .andWhere("id", "=", index)
        .del();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NoteService;
