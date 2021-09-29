exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([{ username: "tester01", password: "123" }]);
    });
};
