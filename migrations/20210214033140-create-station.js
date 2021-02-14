'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      complex_id: {
        type: Sequelize.INTEGER
      },
      gtfs_stop_id: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      line: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      borough: {
        type: Sequelize.STRING
      },
      structure: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      north_label: {
        type: Sequelize.STRING
      },
      south_label: {
        type: Sequelize.STRING
      },
      ada: {
        type: Sequelize.INTEGER
      },
      ada_notes: {
        type: Sequelize.STRING
      },
      main_photo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stations');
  }
};