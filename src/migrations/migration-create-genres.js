'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Genres', {

            // genresName: DataTypes.STRING,
            // image: DataTypes.STRING,
            // public_id_image: DataTypes.STRING,


            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            genresName: {
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
        await queryInterface.dropTable('Genres');
    }
};