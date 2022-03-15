'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Albums extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//

            // 1 album có nhiều nghệ sĩ //
            Albums.belongsToMany(models.Artists, { as: 'AlbumOfArtists', through: models.ArtistsAlbum, foreignKey: 'albumsId' });

            // 1 album có nhiều bài hát //
            Albums.belongsToMany(models.Songs, { as: 'AlbumForSongs', through: models.AlbumSong, foreignKey: 'albumsId' });

            // 1 album thuộc 1 thể loại nhạc //
            Albums.belongsTo(models.Genres, { foreignKey: 'genresId', targetKey: 'id', as: 'AlbumGenre' })

        }
    };
    Albums.init({
        albumName: DataTypes.STRING,
        albumTimeLength: DataTypes.DOUBLE,
        countListen: DataTypes.INTEGER,
        image: DataTypes.STRING,
        public_id_image: DataTypes.STRING,
        description: DataTypes.STRING,
        genresId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Albums',
        freezeTableName: true
    });
    return Albums;
};