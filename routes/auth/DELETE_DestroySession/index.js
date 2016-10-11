'use strict';

// Require the helper libraries.
var _ = require('lodash');

module.exports = function(req, res, next) {
    // Tell Passport.js to destroy the user's session.
    req.logout();

    res.status(200);
    res.json({ message: 'You are logged out.' });

    return next();
};