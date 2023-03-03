const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const Board = sequelize.define("board", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
});

module.exports = { Board};