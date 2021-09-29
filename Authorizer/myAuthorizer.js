const myAuthorizer = (knex) => {
  return (username, password, cb) => {
    let userQuery = knex
      .select("username")
      .from("users")
      .where("username", "=", username)
      .andWhere("password", "=", password);

    userQuery
      .then((user) => {
        if (user.length === 1) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

module.exports = myAuthorizer;
