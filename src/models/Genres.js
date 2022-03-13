'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Genres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        //Một người dùng thuộc 1 all code //
        static associate(models) {

            // define association here//

            // 1 thể loại nhạc có nhiều albums //
            Genres.hasMany(models.Albums, { foreignKey: 'genresId', as: 'AlbumGenre' })

            // 1 thể loại nhạc có nhiều playlist //
            Genres.hasMany(models.Playlists, { foreignKey: 'genresId', as: 'PlaylistGenre' })

            // 1 thể loại nhạc có nhiều bài hát //
            Genres.hasMany(models.Songs, { foreignKey: 'genresId', as: 'GenresSong' })

        }
    };
    Genres.init({
        genresName: DataTypes.STRING,
        image: DataTypes.STRING,
        public_id_image: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Genres',
        freezeTableName: true
    });
    return Genres;
};