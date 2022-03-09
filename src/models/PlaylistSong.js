'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PlaylistSong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//
            // bảng trung gian quan hệ nhiều nhiều //
            PlaylistSong.belongsTo(models.Playlists, { foreignKey: 'playlistId', targetKey: 'id', as: 'Playlist' });
            PlaylistSong.belongsTo(models.Songs, { foreignKey: 'songId', targetKey: 'id', as: 'Song' });

        }
    };
    PlaylistSong.init({
        playlistId: DataTypes.INTEGER,
        songId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'PlaylistSong',
        freezeTableName: true
    });
    return PlaylistSong;
};