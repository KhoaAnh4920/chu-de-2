'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //Một người dùng thuộc 1 all code //
        static associate(models) {

            // define association here//

            // 1 quốc gia có nhiều ca sĩ //
            Country.hasMany(models.Artists, { foreignKey: 'country', as: 'ArtistsCountry' })

        }
    };
    Country.init({
        keyCountry: DataTypes.STRING,
        nameCountry: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Country',
        freezeTableName: true
    });
    return Country;
};