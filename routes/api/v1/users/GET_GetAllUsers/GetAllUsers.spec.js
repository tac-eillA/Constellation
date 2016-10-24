'use strict';

// Import the helper libraries.
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');

// Create the request and response objects to be modified later.
var req,
    res;

// Require the route so that we can call the function and test its response.
var GetAllUsers = require('./index.js');

describe('API v1', function() {
    describe('=> Users', function() {
        describe('=> GetAllUsers (GET /api/v1/users)', function() {
            // Before each test...
            beforeEach(function(next) {
                // Set the request and response objects equal to an empty object.
                req = res = {};

                // Create the query object.
                req.query = {
                    offset: 0,
                    limit: 4
                };

                // Create the spies for the .json and .status functions.
                res.json = sinon.spy();
                res.status = sinon.spy();

                // Mock the "model" that will be used.
                req.models = {
                    identity: {
                        User: {}
                    }
                };

                // Create the promise that mocks the Sequelize functionality to retrieve the necessary data from the database.
                req.models.identity.User.findAndCountAll = function(obj) {
                    return new Promise(function(resolve, reject) {
                        let users = [
                            {
                                id: 'ea4f0e8e-f5a9-4a32-a4d7-11af65a701c1',
                                username: 'some.dude'
                            },
                            {
                                id: '5f6c3c5e-64fb-413e-abcb-55c8749e86fd',
                                username: 'some.lady'
                            },
                            {
                                id: 'ea4f0e8e-f5a9-4a32-a4d7-11af65a701c1',
                                username: 'second.dude'
                            },
                            {
                                id: '5f6c3c5e-64fb-413e-abcb-55c8749e86fd',
                                username: 'second.lady'
                            }
                        ];

                        // Return the users based upon the offset and limit passed.
                        let end = _.multiply(_.add(obj.offset, 1), obj.limit);
                        let slicedUsers = _.slice(users, obj.offset, end);

                        // Add the "safeReturnObject" attribute with a copy of the data attributes to mock that attribute.
                        _.forEach(slicedUsers, function(u) {
                            u.safeReturnObj = _.clone(u);
                        });

                        // Return the resolved promise with the data attributes needed.
                        return resolve({
                            count: _.size(users),
                            rows: slicedUsers
                        });
                    });
                };

                // Call the callback function.
                return next();
            });

            it('should call the res.status() function.', function(done) {
                GetAllUsers(req, res, function() {
                    try {
                        expect(res.status.calledOnce).to.equal(true);

                        return done();
                    }
                    catch(err) {
                        return done(err);
                    }
                });
            });

            it('should call the res.json() function.', function(done) {
                GetAllUsers(req, res, function() {
                    try {
                        expect(res.json.calledOnce).to.equal(true);

                        return done();
                    }
                    catch(err) {
                        return done(err);
                    }
                });
            });

            it('should return 2 records when the offset is 0 and the limit is 2.', function(done) {
                req.query.offset = 0;
                req.query.limit = 2;

                GetAllUsers(req, res, function() {
                    try {
                        expect(_.size(res.json.args[0][0].data)).to.equal(2);

                        return done();
                    }
                    catch(err) {
                        return done(err);
                    }
                });
            });

            it('should return a count of 2 records when the offset is 0 and the limit is 2.', function(done) {
                req.query.offset = 0;
                req.query.limit = 2;

                GetAllUsers(req, res, function() {
                    try {
                        expect(res.json.args[0][0].count).to.equal(2);

                        return done();
                    }
                    catch(err) {
                        return done(err);
                    }
                });
            });

            it('should throw an error if an un-allowed attribute is passed in the fields query parameter.', function(done) {
                req.query.fields = 'newField';

                GetAllUsers(req, res, function(e) {
                    try {
                        expect(e).to.exist;

                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                });
            });

            it('should throw an error if neither a + nor - sign is used in front of the sort field.', function(done) {
                req.query.sort = '#emailAddress';

                GetAllUsers(req, res, function(e) {
                    try {
                        expect(e).to.exist;

                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                });
            });

            it('should throw an error if an un-allowed field is used in the sort query field parameter.', function(done) {
                req.query.sort = '+newField';

                GetAllUsers(req, res, function(e) {
                    try {
                        expect(e).to.exist;

                        done();
                    }
                    catch(err) {
                        done(err);
                    }
                });
            });
        });
    });
});