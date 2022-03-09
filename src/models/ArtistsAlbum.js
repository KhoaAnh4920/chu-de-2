'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ArtistsAlbum extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //Một người dùng thuộc 1 all code //
        static associate(models) {

            // define association here//

            // bảng trung gian quan hệ nhiều nhiều //
            ArtistsAlbum.belongsTo(models.Albums, { foreignKey: 'albumsId', targetKey: 'id', as: 'Albums' });
            ArtistsAlbum.belongsTo(models.Artists, { foreignKey: 'artistsId', targetKey: 'id', as: 'Artists' });

        }
    };
    ArtistsAlbum.init({
        artistsId: DataTypes.INTEGER,
        albumsId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'ArtistsAlbum',
        freezeTableName: true
    });
    return ArtistsAlbum;
};