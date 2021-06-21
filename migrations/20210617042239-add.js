'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'displayName', Sequelize.STRING, {});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'displayName', {});
  }
};
