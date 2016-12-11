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
    const fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });
router.get('/about', require('./about').registerRouter());
router.get('/', (req, res) => {
  models.Markers.findAll().then((marker) => {
    const result = JSON.stringify(marker);
    res.render('homepage', { result, marker });
  });
});

module.exports = router;
