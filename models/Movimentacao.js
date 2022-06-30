const { Model, DataTypes } = require('sequelize');

class Movimentacao extends Model{
    static init(connection){
        super.init({
            usuario_id: DataTypes.INTEGER,
            acao_id: DataTypes.INTEGER,
            tipo: DataTypes.STRING,
            quantidade: DataTypes.STRING,
            valor: DataTypes.DECIMAL,
        }, {sequelize: connection, tableName: 'movimentacoes'})
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: "usuario_id", as: 'usuario'});
        this.belongsTo(models.Acao, {foreignKey: "acao_id", as: 'acao'});
    }
}

module.exports = Movimentacao;