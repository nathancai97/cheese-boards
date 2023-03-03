const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = { User };
