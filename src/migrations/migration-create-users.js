'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {


    //   email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // avatar: DataTypes.STRING,
    // isActive: DataTypes.BOOLEAN,
    // public_id_image: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // birthday: DataTypes.DATE,
    // userName: DataTypes.STRING,
    // roleId: DataTypes.STRING,
    // userToken: DataTypes.STRING,

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      public_id_image: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      birthday: {
        type: Sequelize.DATE
      },
      userName: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.STRING
      },
      userToken: {
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  }
};