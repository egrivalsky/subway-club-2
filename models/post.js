'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.post.belongsTo(models.user);
      models.post.belongsTo(models.station);
    }
  };
  post.init({
    stationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    user_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};