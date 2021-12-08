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

     return await queryInterface.bulkInsert(
      'Balances',
      [
        {
          type: 'Cash on Hand',
          amount: 718.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Golf Lessons',
          amount: 3651,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Tips',
          amount: 503,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Miscellaneous',
          amount: 5101.68,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Foreign Currency',
          amount: 7.51438803,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return await queryInterface.bulkDelete('Balances', null, {});
  }
};
