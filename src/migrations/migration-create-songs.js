'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {


        // nameSong: DataTypes.STRING,
        // countListen: DataTypes.INTEGER,
        // description: DataTypes.STRING,
        // image: DataTypes.STRING,
        // lyrics: DataTypes.TEXT('long'),
        // public_id_image: DataTypes.STRING,
        // timePlay: DataTypes.DOUBLE,
        // url: DataTypes.STRING,
        // public_id_url: DataTypes.STRING,
        // genresId: DataTypes.INTEGER,

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
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      lyrics: {
        allowNull: true,
        type: Sequelize.STRING
      },
      public_id_image: {
        type: Sequelize.BOOLEAN
      },
      timePlay: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.BOOLEAN
      },
      public_id_url: {
        type: Sequelize.DATE
      },
      genresId: {
        type: Sequelize.STRING
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