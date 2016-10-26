var express = require('express');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', this.profile);

    return router;
  },
  profile(req, res) {
    res.render('profile');
  },
};
