'use strict';

// Require the helper libraries.
var _ = require('lodash');

module.exports = function(req, res, next) {
    // If the user is not authenticated via Passport...
    if(_.eq(req.isAuthenticated(), false)) {
        // Create the Error object.
        let e = new Error('GET_ValidateSession => requestor is not authenticated.');

        // Add the Error status code.
        e.status = 403;

        // Add the message for the user.
        e.userMessage = 'You are not authenticated.';

        // Issue the callback function with the Error object.
        return next(e);
    }

    // Set the status code for the response.
    res.status(200);

    // Set the JSON object to be returned in the response.
    res.json({
        links: {
            prev: null,
            self: req.originalUrl,
            next: null
        },
        message: 'You are authenticated.',
        data: [req.user]
    });

    // Return the callback function to proceed to the next step in the Express pipeline.
    return next();
};