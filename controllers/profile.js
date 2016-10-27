var express = require('express');
var Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn('/'), this.profile);

    return router;
  },
  profile(req, res) {
    res.render('profile');
  },
};
