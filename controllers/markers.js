var express = require('express');
var models = require('../models');
var Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.post('/', Redirect.ifNotLoggedIn('/login'), this.addMarker);

    return router;
  },
  addMarker(req, res) {
    models.Markers.create({
      name: req.body.inputName,
      lat: req.body.inputLatitude,
      lng: req.body.inputLongitude
    }).then((marker) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
  },
};
