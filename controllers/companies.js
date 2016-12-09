var express = require('express');
var models = require('../models');
var Redirect = require('../middlewares/redirect');
var getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/new', Redirect.ifNotLoggedIn('/login'), this.new);
    router.post('/', Redirect.ifNotLoggedIn('/login'), this.create);
    router.get('/:username/:slug', this.show);
    router.get('/:username/:slug/edit',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/companies'),
                this.edit
              );
    router.put('/:username/:slug',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/companies'),
                this.update
              );
    router.delete('/:username/:slug',
                   Redirect.ifNotLoggedIn('/login'),
                   Redirect.ifNotAuthorized('/companies'),
                   this.delete
                  );

    return router;
  },
  index(req, res) {
    models.Company.findAll().then((company) => {
      res.render('companies', { company });
    });
  },
  new(req, res) {
    res.render('companies/new');
  },
  create(req, res) {
    models.Company.create({
      email: req.user.email,
      username: req.user.username,
      slug: getSlug(req.body.companyName.toLowerCase()),
      companyName: req.body.companyName.toLowerCase(),
      companyWebsite: req.body.companyWebsite,
      companyPhone: req.body.companyPhone,
        address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode
    }).then((company) => {
      res.redirect(`/companies/${company.username}/${company.companyName}`);
    }).catch(() => {
      res.render('companies/new');
    });
  },
  show(req, res) {
    models.Company.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((company) =>
      (company ? res.render('companies/single', { company }) : res.redirect('/companies'))
    );
  },
  edit(req, res) {
    models.Company.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((company) =>
      (company ? res.render('companies/edit', { company }) : res.redirect('/companies'))
    );
  },
  update(req, res) {
    models.Company.update({
      companyName: req.body.companyName.toLowerCase(),
      slug: getSlug(req.body.companyName.toLowerCase()),
      companyWebsite: req.body.companyWebsite,
      companyPhone: req.body.companyPhone,
        address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode,
    }, {
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((company) => {
      res.redirect(`/companies/${company.username}/${company.companyName}`);
    });
  },
  delete(req, res) {
    models.Company.destroy({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then(() => {
      res.redirect('/companies');
    });
  },
};
