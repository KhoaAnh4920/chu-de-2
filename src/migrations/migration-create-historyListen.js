'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('HistoryListen', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            countListen: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER
            },
            songId: {
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
        await queryInterface.dropTable('HistoryListen');
    }
};