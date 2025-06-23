'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'deletedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE
    });
  }
};
