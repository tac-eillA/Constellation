'use strict';

// Require the Passport.js module.
var passport = require('passport'),
    bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy,
    _ = require('lodash');

// Require the models.
var models = require('../models');

passport.serializeUser(function(user, next) {
    // Binding the user object to the req.user object so it will be accessible from the route controllers.
    return next(null, user.safeReturnObj);
});

passport.deserializeUser(function(user, next) {
    next(null, user);
});

passport.use(
    'local-username',
    new LocalStrategy(
        { usernameField: 'username' },
        function(username, password, next) {
            // Use Sequelize to find the user based upon the username...
            models.identity.User.findOne({ where: { username: username } })
                .then(function(user) {
                    // If the user was not found...
                    if(_.isUndefined(user) || _.isNull(user)) {
                        // Create an Error object.
                        let e = new Error('./config/passport.js => passport.use("local-username")\n ===> User attempted to log in with a username that doesn\'t exist.');

                        // Set the Error's status.
                        e.status = 400;

                        // Set the message that will be sent back to the user.
                        e.userMessage = 'The username or password is incorrect.';

                        // TODO: Implement a lockout mechanism if the user attempts to log in too many times with an invalid username.

                        // Return the function with the error.
                        return next(e, null);
                    }

                    // Use bcryptjs to compare the passwords.
                    bcrypt.compare(password, user.dataValues.password, function(compareErr, isCorrectPassword) {
                        // If the bcryptjs comparison fails...
                        if(compareErr) {
                            // Return the function with the error.
                            return next(compareErr, null);
                        }
                        // If the password was wrong...
                        else if(_.eq(isCorrectPassword, false)) {
                            // Create the Error object...
                            let e = new Error('./config/passport.js => passport.use("local-email")\n ===> User attempted login with incorrect password.');

                            // Set the Error's status.
                            e.status = 400;

                            // Set the message to be returned to the users.
                            e.userMessage = 'The username or password is incorrect.';

                            // TODO: Need to implement a lockout mechanism for when a user attempts to log in too many times with an incorrect password.

                            // Return the Error to be handled in the RouteError.js function.
                            return next(e, null);
                        }

                        // User was successfully validated.
                        return next(null, user);
                    });
                })
                .catch(function(e) {
                    // Return the Error to be handled in the RouteError.js function.
                    return next(e, null);
                });
        }
    )
);

module.exports = passport;