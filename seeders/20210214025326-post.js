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
    title: "Profit-focused",
    rating: 1,
    comment: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    user_photo: "http://dummyimage.com/165x122.png/cc0000/ffffff",
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: "emulation",
    rating: 1,
    comment: "Duis bibendum, felis sed interdum venenatis.",
    user_photo: "http://dummyimage.com/215x249.jpg/5fa2dd/ffffff",
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: "Graphical User Interface",
    rating: 2,
    comment: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    user_photo: "http://dummyimage.com/232x130.png/ff4444/ffffff",
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: "model",
    rating: 3,
    comment: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    user_photo: "http://dummyimage.com/220x155.png/cc0000/ffffff",
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: "foreground",
    rating: 4,
    comment: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    user_photo: "http://dummyimage.com/135x182.bmp/dddddd/000000",
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: "zero tolerance",
    rating: 5,
    comment: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_photo: "http://dummyimage.com/209x246.jpg/dddddd/000000",
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
