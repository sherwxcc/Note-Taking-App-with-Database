exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "elon", password: "musk" },
        { username: "sherman", password: "123" },
      ]);
    });
};
