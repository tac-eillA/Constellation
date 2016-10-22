var expect = require('chai').expect;
var sinon = require('sinon');

// Require the route so that we can call the function and test its response.
var GetAllUsers = require('./index.js');

var req,
    res;

describe('API v1', function() {
    describe('=> Users', function() {
        describe('=> GetAllUsers (GET /api/v1/users)', function() {
            // Before each test...
            beforeEach(function(next) {
                // Set the request and response objects equal to an empty object.
                req = res = {};

                // Create the spies for the .json and .status functions.
                res.json = sinon.spy();
                res.status = sinon.spy();

                // Call the callback function.
                return next();
            });

            xit('should call the res.status() function.', function(next) {
                GetAllUsers(req, res, function() {
                    expect(res.status.calledOnce).to.equal(true);

                    return next();
                });
            });

            xit('should call the res.json() function.', function(next) {
                GetAllUsers(req, res, function() {
                    expect(res.json.calledOnce).to.equal(true);

                    return next();
                });
            });
        });
    });
});