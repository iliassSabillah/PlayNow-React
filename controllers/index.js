var express = require('express');
var fs = require('fs');
var path = require('path');

var models = require('../models');
var router = express.Router();
var basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    var fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });

router.get('/', (req, res) => {
  models.Markers.findAll().then((marker) => {
    var result = JSON.stringify(marker);
    res.render('homepage', { result, marker });
  });
});

router.post('/', (req, res) => {
  models.Markers.create({
    name: req.body.name,
    sport: req.body.sport,
    participants: req.body.participants,
    lat: req.body.lat,
    lng: req.body.lng
  }).then((marker) => {
    res.json(marker);
  });
});

module.exports = router;
