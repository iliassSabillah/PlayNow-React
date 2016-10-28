var express = require('express');
var models = require('../models');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.post('/', this.addMarker);

    return router;
  },
  addMarker(req, res) {
    models.Markers.create({
      name: req.body.inputName,
      lat: req.body.inputLatitude,
      lng: req.body.inputLongitude
    }).then(() => {
      res.redirect('homepage');
    }).catch((err) => {
      console.log(err);
    });
  },
};
