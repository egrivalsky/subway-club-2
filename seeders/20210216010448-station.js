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
   return queryInterface.bulkInsert('stations', [{
    complex_id: 1,
    gtfs_stop_id: 'R01',
    division: 'BMT',
    line: 'Astoria',
    name: 'Astoria-Ditmars Blvd',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.775036,
    longitude: -73.912034,
    north_label: null,
    south_label: 'Manhattan',
    ada: 0,
    ada_notes: null,
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {    complex_id: 2,
    gtfs_stop_id: 'R03',
    division: 'BMT',
    line: 'Astoria',
    name: 'Astoria Blvd',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.770258,
    longitude: -73.917843,
    north_label: 'Ditmars Blvd',
    south_label: 'Manhattan',
    ada: 1,
    ada_notes: null,
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {    complex_id: 3,
    gtfs_stop_id: 'R04',
    division: 'BMT',
    line: 'Astoria',
    name: '30 Av',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.766779,
    longitude: -73.921479,
    north_label: 'Astoria - Ditmars',
    south_label: 'Manhattan',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 4,
    gtfs_stop_id: 'R05',
    division: 'BMT',
    line: 'Astoria',
    name: 'Broadway',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.76182,
    longitude: -73.925508,
    north_label: 'Astoria - Ditmars',
    south_label: 'Manhattan',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 5,
    gtfs_stop_id: 'R06',
    division: 'BMT',
    line: 'Astoria',
    name: '36 Av',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.756804,
    longitude: -73.929575,
    north_label: 'Astoria - Ditmars',
    south_label: 'Manhattan',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 6,
    gtfs_stop_id: 'R08',
    division: 'BMT',
    line: 'Astoria',
    name: '39 Av-Dutch Kills',
    borough: 'Q',
    structure: 'Elevated',
    latitude: 40.752882,
    longitude: -73.932755,
    north_label: 'Astoria - Ditmars',
    south_label: 'Manhattan',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 613,
    gtfs_stop_id: 'R11',
    division: 'BMT',
    line: 'Astoria',
    name: 'Lexington Av/59 St',
    borough: 'M',
    structure: 'Subway',
    latitude: 40.76266,
    longitude: -73.967258,
    north_label: 'Queens',
    south_label: 'Downtown & Brooklyn',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 8,
    gtfs_stop_id: 'R13',
    division: 'BMT',
    line: 'Astoria',
    name: '5 Av/59 St',
    borough: 'M',
    structure: 'Subway',
    latitude: 40.764811,
    longitude: -73.973347,
    north_label: 'Queens',
    south_label: 'Downtown & Brooklyn',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 9,
    gtfs_stop_id: 'R14',
    division: 'BMT',
    line: 'Broadway - Brighton',
    name: '57 St-7 Av',
    borough: 'M',
    structure: 'Subway',
    latitude: 40.764664,
    longitude: -73.980658,
    north_label: 'Uptown & Queens',
    south_label: 'Downtown & Brooklyn',
    ada: 0,
    ada_notes: 'null',
    main_photo: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {    complex_id: 10,
    gtfs_stop_id: 'R15',
    division: 'BMT',
    line: 'Broadway - Brighton',
    name: '49 St',
    borough: 'M',
    structure: 'Subway',
    latitude: 40.759901,
    longitude: -73.984139,
    north_label: 'Uptown & Queens',
    south_label: 'Downtown & Brooklyn',
    ada: 2,
    ada_notes: 'Uptown only',
    main_photo: 'url',
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
