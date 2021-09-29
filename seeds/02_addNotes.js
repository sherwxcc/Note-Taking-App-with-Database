exports.seed = function (knex) {
  return knex("notes")
    .del()
    .then(function () {
      return knex("notes").insert([
        { note: "Elon testing 1", user_id: "1" },
        { note: "Elon testing 2", user_id: "1" },
        { note: "GGWP", user_id: "2" },
        { note: "123456", user_id: "2" },
      ]);
    });
};
