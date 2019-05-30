'use strict';
// make sure all the new elements are added to the app js and models folder 
module.exports = {
  up: async function (queryInterface, Sequelize) {
    
      await queryInterface.addColumn('Reports', 'latitude', {
        type: Sequelize.DOUBLE
      }),
      await queryInterface.addColumn('Reports', 'longitude', {
        type: Sequelize.DOUBLE,
      })

      return Promise.resolve()

    
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Reports', 'latitude'),
      queryInterface.removeColumn('Reports', 'longitude')
    ];
  }
};
