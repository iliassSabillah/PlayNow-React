var Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var Company = sequelize.define('company', {
    email: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    slug: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    companyName: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    companyWebsite: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    companyPhone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    zipcode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  

  return Company;
};
