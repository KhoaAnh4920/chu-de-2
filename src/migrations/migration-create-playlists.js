'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Playlists', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            playlistName: {
                type: Sequelize.STRING
            },
            playlistTimeLength: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
            countListen: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
            userId: {
                allowNull: true,
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
        await queryInterface.dropTable('Playlists');
    }
};