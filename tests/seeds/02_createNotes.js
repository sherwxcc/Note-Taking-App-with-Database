exports.seed = function (knex) {
  return knex("notes")
    .del()
    .then(function () {
      return knex("notes").insert([{ note: "Jest", user_id: "1" }]);
    });
};
