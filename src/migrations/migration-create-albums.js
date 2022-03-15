'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Albums', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            albumName: {
                type: Sequelize.STRING
            },
            albumTimeLength: {
                allowNull: true,
                type: Sequelize.DOUBLE
            },
            countListen: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            description: {
                type: Sequelize.STRING
            },

            image: {
                allowNull: true,
                type: Sequelize.STRING
            },
            public_id_image: {
                allowNull: true,
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
        await queryInterface.dropTable('Albums');
    }
};