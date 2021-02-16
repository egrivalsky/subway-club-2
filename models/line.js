'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.line.belongsToMany(models.station, {
        through: "stationsLines"
      });
    }
  };
  line.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'line',
  });
  return line;
};