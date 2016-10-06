'use strict';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    let e = new Error('The user is not authenticated.');
    e.status = 401;
    e.userMessage = 'You must be authenticated.';

    return next(e);
};