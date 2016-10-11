'use strict';

// Create the express object to attach the routes.
var express = require('express');
var api = express();

// require the passport configuration.
var passport = require('../../config/passport.js');

// Bind the routes.
api.route('/auth')
    .get(require('./GET_ValidateSession'))
    .post(passport.authenticate('local-email'), require('./POST_CreateSession'))
    .delete(require('./DELETE_DestroySession'));

// Export the API routes that were created above.
module.exports = api;