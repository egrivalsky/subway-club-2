'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('stations', [{
    name: 'A',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'B',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'C',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'D',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'E',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'F',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'G',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'L',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'J',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'M',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'N',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'Q',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'R',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'W',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: 'Z',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '3',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '4',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '5',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    line: '7',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});


},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
