var express = require('express');
var Redirect = require('../middlewares/redirect');
var models = require('../models');

module.exports = {
 registerRouter() {
   var router = express.Router();
   router.get('/', Redirect.ifNotLoggedIn('/login'), this.index);
   router.post('/', this.submit);
   return router;
 },
 index(req, res) {
   if (req.user.username){
     models.User.findOne({
       where : {username: req.user.username}
     }).then((user) =>{
       var sport = user.sportspref;
       res.render('sports', { sport });
     });
   }
   else {
     res.render('sports');
   }
 },
   submit(req, res) {
    models.User.update({
      sportspref: req.body.sport,
    }, {
      where: {
        username: req.user.username
      }
  }).then(() => {
        res.redirect('/profile')
    }).catch((err) => {
       console.log(err);
    });
  },
};
