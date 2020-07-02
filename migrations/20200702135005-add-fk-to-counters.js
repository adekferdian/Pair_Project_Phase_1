'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('Counters',"AdminId",
      {type: Sequelize.INTEGER,
        references:{
          model:"Admins",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
       })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Counters',"AdminId")
  }
};
