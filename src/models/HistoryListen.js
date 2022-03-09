'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoryListen extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {

            // define association here//

            // 1 lịch sử nghe thuộc 1 user //
            HistoryListen.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id', as: 'UserHistory' })

            // 1 lịch sử nghe thuộc 1 bài hát //
            HistoryListen.belongsTo(models.Songs, { foreignKey: 'songId', targetKey: 'id', as: 'SongHistory' })
        }
    };
    HistoryListen.init({
        countListen: DataTypes.INTEGER,
        date: DataTypes.DATE,
        songId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'HistoryListen',
        freezeTableName: true
    });
    return HistoryListen;
};