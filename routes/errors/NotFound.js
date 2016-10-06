// Require the Lodash library.
var _ = require('lodash');

/**
 *
 * @param req - http://expressjs.com/en/4x/api.html#req
 * @param res - http://expressjs.com/en/4x/api.html#res
 * @return res.status().json()
 */
module.exports = function(req, res, next) {
    // If the headers are already set...
    if(!_.isUndefined(res.headersSent) || !_.isNull(res.headersSent)) {
        return next();
    }

    res.status(404);
    res.json({
        links: {
            self: req.originalUrl
        },
        message: 'The file or path could not be found.'
    });

    return next();
};