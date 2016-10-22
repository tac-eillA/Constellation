'use strict';

var _ = require('lodash');

module.exports = function(req, res, next) {
    // Create the parameters object (with the default values) for the parameters that are passed to this path.
    var params = {
        offset: _.parseInt(req.query.offset),
        limit: _.parseInt(req.query.limit),
        sort: null,
        fields: []
    };

    // Create the object that will contain the necessary information for the response.
    var responseObject = {
        users: [],
        count: null,
        total: null
    };

    _HandleFieldsParameter()
        .then(_HandleSortingParameter)
        .then(_GetData)
        .then(_FindAllSuccess)
        .then(_SetSuccessfulResponse)
        .catch(_HandleFailure);

    /**
     *
     * @returns {Promise} - http://docs.sequelizejs.com/en/latest/api/model/#findandcountfindoptions-promiseobject
     * @private
     */
    function _HandleFieldsParameter() {
        return new Promise(function(resolve, reject) {
            // If the fields query parameter doesn't exist...
            if(_.isUndefined(req.query.fields) || _.isNull(req.query.fields) || _.eq(req.query.fields, '')) {
                // Resolve the promise because the rest of the code is unnecessary.
                return resolve();
            }

            // Create an array with all of the allowed fields (must be camel-case to match the attributes of the object).
            let allowedFields = [
                'emailAddress',
                'createdTs',
                'lastModifiedTs',
                'deletedTs'
            ];

            // Create an array with the attributes from the "fields" query parameter.
            let queryFields = _.chain(req.query.fields)
                .clone()
                .split(',')
                .value();

            // Validation to see if there is a difference between the queryFields and allowedFields arrays.
            let hasNoDiff = _.chain(queryFields)
                .map(function(f) { return _.camelCase(f); })
                .difference(allowedFields)
                .size()
                .eq(0)
                .value();

            // If there is no difference...
            if(hasNoDiff) {
                // Set the fields that are validated.
                params.fields = _.map(queryFields, function(str) {
                        // If the user passes the createdTs, lastModifiedTs, and deletedTs as fields, then convert it to snake case.
                        return _.eq(str, 'createdTs') || _.eq(str, 'lastModifiedTs') || _.eq(str, 'deletedTs') ? _.snakeCase(str) : str;
                    });

                // Resolve the promise.
                return resolve();
            }
            else {
                // Create a new Error object.
                let e = new Error('The "fields" query parameter has values in the list that are not allowed.');
                e.status = 422;
                e.userMessage = 'The "fields" query parameter can only contain the following values: ' + _.join(allowedFields, ',');

                // Reject the promise to return the error to the RouteError.js handler.
                return reject(e);
            }
        });
    }

    /**
     *
     * @returns {Promise} - http://docs.sequelizejs.com/en/latest/api/model/#findandcountfindoptions-promiseobject
     * @private
     */
    function _HandleSortingParameter() {
        return new Promise(function(resolve, reject) {
            // Set the default sorting type and value, along with the allowedSortingFields.
            let sortType = 'asc',
                sortValue = 'username',
                allowedSortFields = [
                    'id',
                    'username',
                    'emailAddress'
                ];

            // If the "sort" query parameter is not defined...
            if(_.isUndefined(req.query.sort) || _.isNull(req.query.sort) || _.eq(req.query.sort, '')) {
                // Resolve the promise.
                return resolve();
            }

            // If the user sets the plus sign as the first character...
            if(_.startsWith(req.query.sort, ' ')) {
                sortType = 'asc';
                sortValue = _.trimStart(req.query.sort);
            }
            // If the user sets the minus sign as the first character...
            else if(_.startsWith(req.query.sort, '-')) {
                sortType = 'desc';
                sortValue = _.trimStart(req.query.sort, '-');
            }
            else {
                // Create the Error object.
                let e = new Error('The first character in the sort must be either a plus sign(+) or minus sign (-).');
                e.status = 422;
                e.userMessage = 'The first character in the sort must be either a plus sign(+) or minus sign (-).';

                // Return the rejected promise with the Error object to be handled in the RouteError.js error handler.
                return reject(e);
            }

            // If the sortValue is one of the allowed values.
            let isAllowed = _.chain(allowedSortFields)
                .includes(sortValue)
                .value();

            // If the value is not allowed...
            if(!isAllowed) {
                // Create the Error object.
                let e = new Error('The field name for the sort is not one of the allowed values: ' + _.join(allowedSortFields, ', '));
                e.status = 422;
                e.userMessage = 'The field name for the sort is not one of the allowed values: ' + _.join(allowedSortFields, ', ');

                // Return the rejected promise with the Error object to be handled in the RouteError.js error handler.
                return reject(e);
            }

            // Add the sort parameter.
            params.sort = _.snakeCase(sortValue) + ' ' + sortType;

            // Return the resolve function.
            return resolve();
        });
    }

    /**
     *
     * @returns {Promise} - http://docs.sequelizejs.com/en/latest/api/model/#findandcountfindoptions-promiseobject
     * @private
     */
    function _GetData() {
        return req.models.identity.User.findAndCountAll({
            attributes: _.concat(['id', 'username'], params.fields),
            order: params.sort,
            limit: params.limit,
            offset: _.multiply(params.limit, params.offset)
        });
    }

    /**
     *
     * @param {Object} response - This is the response object returned back from the findAndCountAll() function from Sequelize.
     * @returns {Promise} - http://docs.sequelizejs.com/en/latest/api/model/#findandcountfindoptions-promiseobject
     * @private
     */
    function _FindAllSuccess(response) {
        return new Promise(function(resolve, reject) {
            // Add the list of users to the users to be used in the responseObject to be returned to the requestor.
            responseObject.users = _.map(response.rows, function(user) {
                return user.safeReturnObj
            });

            // Add the count of the number of rows to be returned to the requestor.
            responseObject.count = _.size(response.rows);

            // Add the total number of rows that came back from the server to be returned to the requestor.
            responseObject.total = _.parseInt(response.count);

            // Return the resolved promise.
            return resolve();
        });
    }

    /**
     *
     * @returns {Function} next - https://expressjs.com/en/4x/api.html
     * @private
     */
    function _SetSuccessfulResponse() {
        let prevUrl = null,
            nextUrl = null;

        // If the offset number requested is greater than 0...
        if(_.gt(params.offset, 0)) {
            // Create the previous URL to be returned to the user.
            prevUrl = req.baseUrl + req.path + '?offset=' + _.subtract(params.offset, 1) + '&limit=' + params.limit;
        }

        // If the "(offset + 1) * limit" is greater than the total number of records returned back from the table...
        if(_.lt(_.multiply(_.add(params.offset, 1), params.limit), responseObject.total)) {
            nextUrl = req.baseUrl + req.path + '?offset=' + _.add(params.offset, 1) + '&limit=' + params.limit;
        }

        // Set the response status.
        res.status(200);

        // Set the response object.
        res.json({
            links: {
                prev: prevUrl,
                self: req.originalUrl,
                next: nextUrl
            },
            message: 'The retrieval of the list of users was successful.',
            data: responseObject.users,
            count: responseObject.count,
            total: responseObject.total
        });

        // Return the next() function to proceed to the next step in the Express.js pipeline.
        return next();
    }

    /**
     *
     * @param {Object} e - This is the Error object that should be handled in the RouteError.js error handler.
     * @returns {Function} next - https://expressjs.com/en/4x/api.html
     * @private
     */
    function _HandleFailure(e) {
        return next(e);
    }
};