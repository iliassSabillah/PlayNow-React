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
    res.render('company');
  },
  submit(req, res) {
    models.company.create({
      companyName: req.body.inputCompanyName,
      companyWebsite: req.body.inputCompanyWebsite,
      companyPhone: req.body.inputCompanyPhone,
      email: req.body.inputEmail,
      password: req.body.inputPassword,
      state: req.body.inputState,
      city: req.body.inputCity,
      zipcode: req.body.inputZipcode,
    }).then((company) => {
      req.login(company, () =>
        res.redirect('/')
      );
    }).catch(() => {
      res.render('company');
    });
  },
};
