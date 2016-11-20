var express = require('express');
var Redirect = require('../middlewares/redirect');

module.exports = {
 registerRouter() {
   var router = express.Router();
   router.get('/', this.index);
   /*router.post('/', this.submit);*/
   return router;
 },
 index(req, res) {
   res.render('sports/enter-location', { error: req.flash('error') });
 },
};