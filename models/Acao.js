const { Model, DataTypes } = require('sequelize');

class Acao extends Model{
    static init(connection){
        super.init({
            tipo: DataTypes.STRING,
            codigo: DataTypes.STRING,
            setor: DataTypes.STRING,
        }, {sequelize: connection, tableName: 'acoes'})
    }
    static associate(models){
        this.hasMany(models.Movimentacao, {foreignKey: "id", as: 'movimentacoes'});
        this.hasMany(models.Dividendo, {foreignKey: "id", as: 'dividendos'});
    }
}

module.exports = Acao;