'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stationsLines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  stationsLines.init({
    stationId: DataTypes.INTEGER,
    lineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stationsLines',
  });
  return stationsLines;
};