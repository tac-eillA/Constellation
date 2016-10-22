var express = require('express');
var router = express.Router({ mergeParams: true });

var policy = require('../../../policies');

// Require the User routes.
router.route('/users')
    .get(/*policy.auth.isAuthenticated, */policy.getCollection.hasRequiredQueryParameters, require('./users/GET_GetAllUsers'))
    .post(require('./users/POST_CreateUser'));

// Export the express application routes.
module.exports = router;