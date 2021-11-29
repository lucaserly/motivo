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
      'Expenses',
      [
        {
          item: 'Range',
          description: 'Gettone',
          amount: 3.5,
          currency: 'euro',
          CategoryId: 3,
          PaymentId: 3,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          item: 'Tennis',
          description: 'Lesson',
          amount: 35,
          currency: 'euro',
          CategoryId: 3,
          PaymentId: 3,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          item: 'Nuoto',
          description: 'Piscina Garda',
          amount: 3.5,
          currency: 'euro',
          CategoryId: 3,
          PaymentId: 3,
          date: new Date(),
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

    return await queryInterface.bulkDelete('Expenses', null, {});
  },
};
