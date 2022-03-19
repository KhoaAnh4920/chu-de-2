'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LikeSong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//

            // bảng trung gian quan hệ nhiều nhiều //
            LikeSong.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id', as: 'UserLike' });
            LikeSong.belongsTo(models.Songs, { foreignKey: 'songId', targetKey: 'id', as: 'SongLike' });


        }
    };
    LikeSong.init({
        userId: DataTypes.INTEGER,
        songId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'LikeSong',
        freezeTableName: true
    });
    return LikeSong;
};