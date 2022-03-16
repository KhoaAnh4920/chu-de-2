'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Artists', {


            //         fullName: DataTypes.STRING,
            // country: DataTypes.STRING,
            // gender: DataTypes.BOOLEAN,
            // description: DataTypes.STRING,
            // image: DataTypes.STRING,
            // public_id_image: DataTypes.STRING,


            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING
            },
            country: {
                allowNull: true,
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.BOOLEAN
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            image: {
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
        await queryInterface.dropTable('Artists');
    }
};