'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'google_id', Sequelize.STRING, {});
    queryInterface.addColumn('users', 'facefook_id', Sequelize.STRING, {});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'google_id', {});
    queryInterface.removeColumn('users', 'facefook_id', {});
  }
};
