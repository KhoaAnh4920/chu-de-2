'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {

      // define association here//

      // 1 bài hát đc thích bởi nhiều user //
      Songs.belongsToMany(models.Users, { as: 'UserInSong', through: models.LikeSong, foreignKey: 'songId' });

      // 1 bài hát có nhiều lịch sử nghe // 
      Songs.hasMany(models.HistoryListen, { foreignKey: 'songId', as: 'SongHistory' })

      // 1 bài hát thuộc nhiều playlist //
      Songs.belongsToMany(models.Playlists, { as: 'PlaylistForSong', through: models.PlaylistSong, foreignKey: 'songId' });

      // 1 bài hát có thể có nhiều ca sĩ hát //
      Songs.belongsToMany(models.Artists, { as: 'SongOfArtists', through: models.ArtistsSong, foreignKey: 'songId' });

      // 1 bài hát thuộc nhiều albums //
      Songs.belongsToMany(models.Albums, { as: 'SongInAlbums', through: models.AlbumSong, foreignKey: 'songId' });

      // 1 bài hát thuộc 1 thể loại //
      Songs.belongsTo(models.Genres, { foreignKey: 'genresId', targetKey: 'id', as: 'GenresSong' })


    }
  };
  Songs.init({
    nameSong: DataTypes.STRING,
    countListen: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    lyrics: DataTypes.TEXT('long'),
    public_id_image: DataTypes.STRING,
    timePlay: DataTypes.DOUBLE,
    url: DataTypes.STRING,
    public_id_url: DataTypes.STRING,
    genresId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Songs',
    freezeTableName: true
  });
  return Songs;
};