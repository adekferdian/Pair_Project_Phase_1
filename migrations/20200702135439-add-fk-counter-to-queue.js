'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Queues', 'CountId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Counters',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Queues', 'CountId', {})
  }
};
