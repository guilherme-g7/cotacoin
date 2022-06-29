const Sequelize = require("sequelize");
const configDb = require("./config/connectDb");
const Usuario = require("./models/Usuario");

const connection = new Sequelize(configDb);

Usuario.init(connection);

module.exports = {}