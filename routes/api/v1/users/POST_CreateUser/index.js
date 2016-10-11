'use strict';

// Require the helper libraries.
var _ = require('lodash');

module.exports = function(req, res, next) {
    // Call the promise chain to handle the responses to the user.
    _GetData()
        .then(_SuccessResponse)
        .catch(_HandleFailure);

    /**
     * Use Sequelize to create the user based upon the POST body parameters.
     *
     * @returns {Promise} - This is the promise created by Sequelize.
     * @private
     */
    function _GetData() {
        return req.models.identity.User.create(
            {
                username: req.body.username,
                emailAddress: req.body.emailAddress,
                password: req.body.password
            });
    }

    /**
     * Create the user response when the user is successfully created.
     *
     * @param {Object} user - User object that contains the user information from Sequelize's query.
     * @returns {Function} next - The function callback to proceed to the next stage in the Express pipeline.
     * @private
     */
    function _SuccessResponse(user) {
        // Set the status return code.
        res.status(201);

        // Set the JSON response value.
        res.json({
            links: {
                prev: null,
                self: req.originalUrl,
                next: null
            },
            message: 'The user was created successfully!',
            data: [user.safeReturnObj]
        });

        // Initiate the callback function.
        return next();
    }

    /**
     * Handle any errors that are created in the route.
     *
     * @param {Object} e - The Error object that will be passed to the RouteError.js functionality.
     * @returns {Function} next - The function callback to proceed to the next stage in the Express pipeline.
     * @private
     */
    function _HandleFailure(e) {
        return next(e);
    }
};