var express = require('express');
var models = require('../models');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    res.render('sports');
  },
  submit(req, res) {
    models.Sports.create({
      userName: req.body.inputUser_Id,
      favorSportOne: req.body.inputFavorSportOne,
      favorSportTwo: req.body.inputFavorSportTwo,
      favorSportThree: req.body.inputFavorSportThree,
      favorSportFour: req.body.inputFavorSportFour,
      favorSportFive: req.body.inputFavorSportFive,
    }).then((sports) => {
      req.login(user, () =>
        res.redirect('/')
      );
    }).catch(() => {
      res.render('sports');
    });
  },
};