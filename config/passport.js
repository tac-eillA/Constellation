'use strict';

// Require the Passport.js module.
var passport = require('passport'),
    bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy;

// Require the models.
var models = require('../models');

passport.serializeUser(function(user, next) {
    return next(null, user.id);
});

passport.deserializeUser(function(id, next) {
    models.identity.User.findOne({ where: { id: id } })
        .then(function(user) {
            return next(null, user);
        })
        .catch(function(e) {
            return next(e, null);
        });
});

passport.use(
    'local-username',
    new LocalStrategy(
        { usernameField: 'username' },
        function(username, password, next) {
            models.identity.User.findOne({ where: { username: username } })
                .then(function(user) {
                    // If the user was not found...
                    if(_.isUndefined(user) || _.isNull(user)) {
                        let e = new Error('./config/passport.js => passport.use("local-username")\n ===> User attempted to log in with a username that doesn\'t exist.');
                        e.status = 400;
                        e.userMessage = 'The username or password is incorrect.';

                        // TODO: Implement a lockout mechanism if the user attempts to log in too many times with an invalid username.

                        // Return the function with the error.
                        return next(e, null);
                    }

                    // Use bcryptjs to compare the passwords.
                    bcrypt.compare(password, user.dataValues.password, function(compareErr, isCorrectPassword) {
                        // If the bcryptjs comparison fails...
                        if(!_.isUndefined(compareErr) || !_.isNull(compareErr)) {
                            // Return the function with the error.
                            return next(compareErr, null);
                        }
                        else if(_.eq(isCorrectPassword, false)) {
                            let e = new Error('./config/passport.js => passport.use("local-email")\n ===> User attempted login with incorrect password.');
                            e.status = 400;
                            e.userMessage = 'The username or password is incorrect.';

                            // TODO: Need to implement a lockout mechanism for when a user attempts to log in too many times with an incorrect password.

                            return next(e, null);
                        }

                        // User was successfully validated.
                        return next(null, user);
                    });
                })
                .catch(function(e) {
                    return next(e, null);
                });
        }
    )
);

module.exports = passport;