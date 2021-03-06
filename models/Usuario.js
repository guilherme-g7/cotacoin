const { Model, DataTypes } = require('sequelize');
 

class Usuario extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {sequelize: connection, tableName: 'usuarios'});
    }
    static associate(models){
        this.hasMany(models.Movimentacao, {foreignKey: "id", as: 'movimentacoes'});
        this.hasMany(models.Dividendo, {foreignKey: "id", as: 'dividendos'});
    }
}

module.exports = Usuario;