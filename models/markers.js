var Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var Markers = sequelize.define('markers', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    lat: {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lng: {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    }
  });

  return Markers;
};
