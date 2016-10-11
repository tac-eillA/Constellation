'use strict';

// Require the helper libraries.
var _ = require('lodash');

module.exports = function(req, res, next) {
    res.status(200);
    res.json({
        message: 'It worked!'
    });

    return next();
};