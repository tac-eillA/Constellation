// Create the express object to attach the routes.
var express = require('express');
var api = express();

// Require the policies in case we need to use any of them below.
var policy = require('../../policies');

api.route('/auth')
    .get(require('./HEAD_ValidateSession'))
    .post(passport.authenticate('local-email'), require('./POST_CreateSession'))
    .delete(require('./DELETE_DestroySession'));

api.route('/csrf')
    .get(require('./GET_GetCsrfToken'));

module.exports = api;