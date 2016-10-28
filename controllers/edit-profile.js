var express = require('express');
var passport = require('../middlewares/authentication');
var models = require('../models');
var Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn('/'), this.index);
    router.post('/', this.update);

    return router;
  },
  index (req, res) {
    res.render('edit-profile');
  },
  update (req, res) {
    models.User.update({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName
    }, {
      where: {
        username: req.user.username
      }
    }).then((user) => {
      res.redirect('/edit-profile');
    });
  },


};
