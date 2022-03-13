'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Playlists extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//

            // 1 playlist thuộc 1 user //
            Playlists.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id', as: 'UserPlaylist' })

            // 1 playlist có nhiều bài hát //
            Playlists.belongsToMany(models.Songs, { as: 'SongInPlaylist', through: models.PlaylistSong, foreignKey: 'playlistId' });

            // 1 playlist thuộc 1 thể loại nhạc //
            Playlists.belongsTo(models.Genres, { foreignKey: 'genresId', targetKey: 'id', as: 'PlaylistGenre' })
        }
    };
    Playlists.init({
        playlistName: DataTypes.STRING,
        playlistTimeLength: DataTypes.DOUBLE,
        countListen: DataTypes.INTEGER,
        image: DataTypes.STRING,
        public_id_image: DataTypes.STRING,
        genresId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Playlists',
        freezeTableName: true
    });
    return Playlists;
};