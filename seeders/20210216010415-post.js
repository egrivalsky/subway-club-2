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
   return queryInterface.bulkInsert('posts', [{
    userId: 1, 
    title: "Profit-focused",
    rating: 1,
    comment: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    user_photo: "http://dummyimage.com/165x122.png/cc0000/ffffff",
    stationId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 1,
    title: "emulation",
    rating: 1,
    comment: "Duis bibendum, felis sed interdum venenatis.",
    user_photo: "http://dummyimage.com/215x249.jpg/5fa2dd/ffffff",
    stationId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 1,
    title: "Graphical User Interface",
    rating: 2,
    comment: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    user_photo: "http://dummyimage.com/232x130.png/ff4444/ffffff",
    stationId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 1,
    title: "model",
    rating: 3,
    comment: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    user_photo: "http://dummyimage.com/220x155.png/cc0000/ffffff",
    stationId: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 2,
    title: "foreground",
    rating: 1,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    stationId: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 3,
    title: "foreground",
    rating: 8,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    stationId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },   {
    userId: 4,
    title: "foreground",
    rating: 1,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    stationId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 5,
    title: "foreground",
    rating: 9,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    stationId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 6,
    title: "foreground",
    rating: 2,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    stationId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    userId: 7,
    title: "zero tolerance",
    rating: 5,
    comment: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_photo: "http://dummyimage.com/209x246.jpg/dddddd/000000",
    stationId: 3,
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