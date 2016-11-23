var express = require('express');
var Redirect = require('../middlewares/redirect');
var models = require('../models');

module.exports = {
 registerRouter() {
   var router = express.Router();
   router.get('/', this.index);
   router.post('/', this.submit);
   return router;
 },
 index(req, res) {
   res.render('sports', { error: req.flash('error') });
 },
   submit(req, res) {
    models.User.update({
      sportspref: req.body.sportspref,
    }, {where: {username:req.params.username} 
  }).then(() => {
        res.redirect('/sports')
    }).catch((err) => {
       console.log(err);
    });
  },
};

