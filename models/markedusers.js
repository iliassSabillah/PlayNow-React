var Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var markedusers = sequelize.define('markedusers', {
    markerId: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return markedusers;
};
