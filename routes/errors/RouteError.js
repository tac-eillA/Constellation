'use strict';

var _ = require('lodash');

/**
 *
 * @param err -
 * @param req - http://expressjs.com/en/4x/api.html#req
 * @param res - http://expressjs.com/en/4x/api.html#res
 * @param next - Callback functionality for the next function in the pipeline.
 * @returns res.status().json()
 */
module.exports = function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Create the default message.
    let defaultMessage = 'There was an error on the server. If you continue to see this error message, please contact the support team.';

    // If the CSRF token was invalid...
    if(_.eq(err.code, 'EBADCSRFTOKEN')) {
        res.status(errCodes[err.code].status);
        res.json({
            links: {
                self: req.originalUrl
            },
            error: 'Invalid CSRF token.'
        });

        return next();
    }

    res.status(err.status || 500);
    res.json({
        links: {
            self: req.originalUrl
        },
        message: (err.userMessage || defaultMessage)
    });

    return next();
};