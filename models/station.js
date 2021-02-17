'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.station.belongsToMany(models.line, {
        through: "stationsLines"
      });
      models.station.hasMany(models.post);
      models.station.hasMany(models.user);
      
    }
  };
  station.init({
    complex_id: DataTypes.INTEGER,
    gtfs_stop_id: DataTypes.STRING,
    division: DataTypes.STRING,
    line: DataTypes.STRING,
    name: DataTypes.STRING,
    borough: DataTypes.STRING,
    structure: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    north_label: DataTypes.STRING,
    south_label: DataTypes.STRING,
    ada: DataTypes.INTEGER,
    ada_notes: DataTypes.STRING,
    main_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'station',
  });
  return station;
};