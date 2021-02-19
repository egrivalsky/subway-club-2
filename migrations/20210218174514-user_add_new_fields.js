'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("users", "avi", {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.addColumn("users", "aboutMe", {
      allowNull: true,
      type: Sequelize.STRING
    })
    await queryInterface.addColumn("users", "userName", {
      type: Sequelize.STRING, 
      validate: {   
        len: {
        args: [4,24],
        msg: 'Username must be between 4 and 24 characters'
      },
        unique: true
    }
    })
    // await queryInterface.addColumn("users", "stationId", {
    //   allowNull: true,
    //   type: Sequelize.INTEGER
    // })

  },
  

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
