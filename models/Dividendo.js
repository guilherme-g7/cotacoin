const { Model, DataTypes } = require('sequelize');

class Dividendo extends Model{
    static init(connection){
        super.init({
            usuario_id: DataTypes.INTEGER,
            acao_id: DataTypes.INTEGER,
            data_compra: DataTypes.DATE,
            data_pagamento: DataTypes.DATE,
            valor: DataTypes.DECIMAL,
        }, {sequelize: connection, tableName: 'dividendos'})
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: "usuario_id", as: 'usuario'});
        this.belongsTo(models.Acao, {foreignKey: "acao_id", as: 'acao'});
    }
}

module.exports = Dividendo;