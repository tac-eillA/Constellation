'use strict';

// Require the helper libraries.
var _ = require('lodash');

module.exports = function(req, res, next) {
    // Set the status for the response (201, since we are "creating" the session).
    res.status(201);

    // Set the JSON response message that lets the user know that their session was created.
    res.json({
        links: {
            prev: null,
            self: req.originalUrl,
            next: null
        },
        message: 'Authentication successful.'
    });

    // Call the callback function to proceed to the next functionality in the Express pipeline.
    return next();
};