'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ArtistsSong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // define association here//

            // bảng trung gian quan hệ nhiều nhiều //
            ArtistsSong.belongsTo(models.Songs, { foreignKey: 'songId', targetKey: 'id', as: 'Songs' });
            ArtistsSong.belongsTo(models.Artists, { foreignKey: 'artistsId', targetKey: 'id', as: 'Artists' });

        }
    };
    ArtistsSong.init({
        artistsId: DataTypes.INTEGER,
        songId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'ArtistsSong',
        freezeTableName: true
    });
    return ArtistsSong;
};