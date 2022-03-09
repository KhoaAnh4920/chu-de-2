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
                type: Sequelize.DOUBLE
            },
            countListen: {
                type: Sequelize.INTEGER
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING
            },
            public_id_image: {
                type: Sequelize.STRING
            },
            genresId: {
                type: Sequelize.INTEGER
            },
            userId: {
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