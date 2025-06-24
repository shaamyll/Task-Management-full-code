module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'planning',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'previous_default_value', // Replace with the old default or null
    });
  }
};
