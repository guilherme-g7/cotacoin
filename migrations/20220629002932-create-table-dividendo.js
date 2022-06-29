'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dividendos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER
      },
      acao_id: {
        type: Sequelize.INTEGER
      },
      data_compra: {
        type: Sequelize.DATE
      },
      data_pagamento: {
        type: Sequelize.DATE
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('dividendos');
  }
};
