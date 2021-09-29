exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("note");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notes");
};
