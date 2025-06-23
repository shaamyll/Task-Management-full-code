'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ✅ Add the `status` column to the `Tasks` table
    await queryInterface.addColumn('Tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  async down(queryInterface, Sequelize) {
    // ✅ Remove the `status` column when rolling back
    await queryInterface.removeColumn('Tasks', 'status');
  },
};
