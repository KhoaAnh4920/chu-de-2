'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Artists extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//

            // 1 nghệ sĩ hát nhiều bài hát //
            Artists.belongsToMany(models.Songs, { as: 'ArtistsForSong', through: models.ArtistsSong, foreignKey: 'artistsId' });

            // 1 nghệ sĩ có nhiều albums //
            Artists.belongsToMany(models.Albums, { as: 'ArtistsForAlbums', through: models.ArtistsAlbum, foreignKey: 'artistsId' });

            // 1 nghệ sĩ thuộc 1 quốc gia //
            Artists.belongsTo(models.Country, { foreignKey: 'country', targetKey: 'keyCountry', as: 'ArtistsCountry' })
        }
    };
    Artists.init({
        fullName: DataTypes.STRING,
        country: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        public_id_image: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Artists',
        freezeTableName: true
    });
    return Artists;
};