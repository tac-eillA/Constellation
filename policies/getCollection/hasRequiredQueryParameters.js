var _ = require('lodash');

module.exports = function(req, res, next) {
    // Create a response error message that can be used whenever the validations fail.
    var responseError;

    if(_.isUndefined(req.query.offset) && _.isUndefined(req.query.limit)) {
        responseError = new Error('The offset and limit parameters are required.');
        responseError.status = 422;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If the API is called with the limit parameter, but not with the offset parameter.
    else if(_.isUndefined(req.query.offset)) {
        responseError = new Error('The offset parameter is required.');
        responseError.status = 422;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If the API is called with the offset parameter, but not with the limit parameter.
    else if(_.isUndefined(req.query.limit)) {
        responseError = new Error('The limit parameter is required.');
        responseError.status = 422;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If the offset query parameter can't be parsed to an integer...
    else if(_.isNaN(_.parseInt(req.query.offset))) {
        responseError = new Error('The offset parameter must be an integer.');
        responseError.status = 400;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If the limit query parameter can't be parsed to an integer...
    else if(_.isNaN(_.parseInt(req.query.limit))) {
        responseError = new Error('The limit parameter must be an integer.');
        responseError.status = 400;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If the offset query parameter is less than zero...
    else if(_.lt(_.parseInt(req.query.offset), 0)) {
        responseError = new Error('The offset parameter must be greater than or equal to zero (0).');
        responseError.status = 400;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    else if(_.gt(_.parseInt(req.query.limit), 50)) {
        responseError = new Error('The limit parameter must be less than or equal to fifty (50).');
        responseError.status = 400;
        responseError.userMessage = responseError.message;

        return next(responseError);
    }
    // If all of the above tests pass, then go to the next step in the pipeline.
    else {
        return next();
    }
};