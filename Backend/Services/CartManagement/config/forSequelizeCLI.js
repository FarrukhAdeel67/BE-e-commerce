const { db } = require("../config");
module.exports = {
  dialect: db.dialect,
  database: db.name,
  username: db.username,
  password: db.password,
  host: db.host,
};
