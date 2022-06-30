const Sequelize = require("sequelize");
const configDb = require("./config/connectDb");
const Usuario = require("./models/Usuario");
const Acao = require("./models/Acao");
const Dividendo = require("./models/Dividendo");
const Movimentacao = require("./models/Movimentacao");

const connection = new Sequelize(configDb);

Usuario.init(connection);
Acao.init(connection);
Dividendo.init(connection);
Movimentacao.init(connection);


Acao.associate(connection.models);
Dividendo.associate(connection.models);
Movimentacao.associate(connection.models);
Usuario.associate(connection.models);

module.exports = {}