'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameSong: {
        type: Sequelize.STRING
      },
      countListen: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      lyrics: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      public_id_image: {
        type: Sequelize.STRING
      },
      timePlay: {
        type: Sequelize.DOUBLE
      },
      url: {
        type: Sequelize.STRING
      },
      public_id_url: {
        type: Sequelize.STRING
      },
      genresId: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};