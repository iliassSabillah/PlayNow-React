const express = require('express');

module.exports = {
    registerRouter() {
        const router = express.Router();
        router.get('/about', this.index);
        return router;
    },
    index(req, res) {
        res.render('about', { error: req.flash('error') });
    }
};
