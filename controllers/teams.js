
const express = require('express');
const models = require('../models');
const Redirect = require('../middlewares/redirect');
const getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/new', Redirect.ifNotLoggedIn('/login'), this.new);
    router.post('/', Redirect.ifNotLoggedIn('/login'), this.create);
    router.get('/:username/:slug', this.show);
    router.get('/:username/:slug/edit',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/teams'),
                this.edit
              );
    router.put('/:username/:slug',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/teams'),
                this.update
              );
    router.delete('/:username/:slug',
                   Redirect.ifNotLoggedIn('/login'),
                   Redirect.ifNotAuthorized('/teams'),
                   this.delete
                  );

    return router;
  },
  index(req, res) {
    models.Team.findAll().then((team) => {
      res.render('teams', { team });
    });
  },
  new(req, res) {
    res.render('teams/new');
  },
  create(req, res) {
    models.Team.create({
      email: req.user.email,
      username: req.user.username,
      slug: getSlug(req.body.teamName),
      teamName: req.body.teamName,
      sporttype: req.body.sporttype,
      teamPhone: req.body.teamPhone,
      location: req.body.location,
      day: req.body.day,
      time: req.body.time,
    }).then((team) => {
      res.redirect(`/teams/${team.username}/${team.teamName}`);
    }).catch(() => {
      res.render('teams/new');
    });
  },
  show(req, res) {
    models.Team.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((team) =>
      (team ? res.render('teams/single', { team }) : res.redirect('/teams'))
    );
  },
  edit(req, res) {
    models.Team.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((team) =>
      (team ? res.render('teams/edit', { team }) : res.redirect('/teams'))
    );
  },
  update(req, res) {
    models.Team.update({
      teamName: req.body.teamName.toLowerCase(),
      slug: getSlug(req.body.teamName.toLowerCase()),
      sporttype: req.body.sporttype,
      teamPhone: req.body.teamPhone,
      location: req.body.location,
      day: req.body.day,
      time: req.body.time,
    }, {
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((team) => {
      res.redirect(`/teams/${team.username}/${team.teamName}`);
    });
  },
  delete(req, res) {
    models.Team.destroy({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then(() => {
      res.redirect('/teams');
    });
  },
};
