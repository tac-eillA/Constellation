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
    console.error(err);

    // Create the default message.
    const defaultMessage = 'There was an error on the server. If you continue to see this error message, please contact the support team.';

    // If the CSRF token was invalid...
    if(_.eq(err.code, 'EBADCSRFTOKEN')) {
        // Set the response status
        res.status(403);
        res.json({
            links: {
                prev: null,
                self: req.originalUrl,
                next: null
            },
            message: 'Invalid CSRF token.'
        });

        return next();
    }
    // If the error was a Sequelize Unique Constraint Error (needs to be handled in a special way)...
    else if(_.eq(err.name, 'SequelizeUniqueConstraintError')) {
        // Set the response status code.
        res.status(422);

        // Set the JSON response value.
        res.json({
            links: {
                prev: null,
                self: req.originalUrl,
                next: null
            },
            message: 'The ' + err.errors[0].message + '.'
        });

        // Return the callback function to proceed to the next step in the Express pipeline.
        return next();
    }
    // If the error was a Sequelize Validation Error (needs to be handled in a special way)...
    else if(_.eq(err.name, 'SequelizeValidationError')) {
        // Create a scoped variable for this if statement's response message.
        let msg = '';

        // If there is only one validation error...
        if(_.eq(err.errors.length, 1)) {
            // Set the response message equal to the validation error message (from the model's validation message).
            msg = err.errors[0].message;
        }
        // If there is more than one validation error...
        else {
            // Create a violations array from the error messages returned from the model validation.
            let violations = _.map(err.errors, function(e) { return e.message; });

            // Set the response message based on the violation messages.
            msg = 'There were multiple validation errors => ' + _.join(violations, ', ');
        }

        // Set the response status code.
        res.status(422);

        // Set the JSON response value.
        res.json({
            links: {
                prev: null,
                self: req.originalUrl,
                next: null
            },
            message: msg
        });

        // Return the callback function to proceed to the next step in the Express pipeline.
        return next();
    }

    // Set the status equal to the status on the error object, or default it to 500 (in case there was not one set).
    res.status(err.status || 500);

    // Set the JSON response value.
    res.json({
        links: {
            prev: null,
            self: req.originalUrl,
            next: null
        },
        message: (err.userMessage || defaultMessage)
    });

    // Return the callback function to proceed to the next step in the Express pipeline.
    return next();
};