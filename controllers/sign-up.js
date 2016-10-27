var express = require('express');
var models = require('../models');
var Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', Redirect.ifLoggedIn('/'), this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    res.render('sign-up');
  },
  submit(req, res) {
    models.User.create({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      username: req.body.inputUsername,
      email: req.body.inputEmail,
      password: req.body.inputPassword,
    }).then((user) => {
      req.login(user, () =>
        res.redirect('/')
      );
    }).catch(() => {
      res.render('sign-up', { error: req.flash('error') });
    });
  },
};
