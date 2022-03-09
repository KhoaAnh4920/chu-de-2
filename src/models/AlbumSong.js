'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AlbumSong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //Một người dùng thuộc 1 all code //
        static associate(models) {

            // define association here//

            // bảng trung gian quan hệ nhiều nhiều //
            AlbumSong.belongsTo(models.Songs, { foreignKey: 'songId', targetKey: 'id', as: 'Songs' });
            AlbumSong.belongsTo(models.Albums, { foreignKey: 'albumsId', targetKey: 'id', as: 'Albums' });

        }
    };
    AlbumSong.init({
        albumsId: DataTypes.INTEGER,
        songId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'AlbumSong',
        freezeTableName: true
    });
    return AlbumSong;
};