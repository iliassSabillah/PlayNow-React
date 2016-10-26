var Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var User = sequelize.define('sports', {
    userName: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    favorSportOne: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    favorSportTwo: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    favorSportThree: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    favorSportFour: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    favorSportFive: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });  

  return Sports;
};
