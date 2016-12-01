var express = require('express');
var Redirect = require('../middlewares/redirect');
var models = require('../models');

module.exports = {
registerRouter() {
  var router = express.Router();
  router.get('/', Redirect.ifNotLoggedIn('/login'), this.index);

  router.get('/edit', Redirect.ifNotLoggedIn('/login'), this.edit);
  router.post('/edit', Redirect.ifNotLoggedIn('/login'), this.update);
  return router;
},
index(req, res) {
  res.render('profile');
},
  edit(req, res){
    res.render('profile/edit');
  },
  update(req, res){
    models.User.update({
      firstName: req.body.first_name,
      // lastName: req.body.last_name,
      // email: req.body.email
    }, {
      where: {
        username: req.user.username
      }
  }).then(() => {
        res.redirect('/profile')
    }).catch((error) => {
        res.redirect('/profile/edit');
    });
  }
};
