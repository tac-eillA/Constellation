'use strict';

// Import the helper libraries.
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');

// Create the request and response objects to be modified later.
var req,
    res;

// Require the route so that we can call the function and test its response.
const GetAllUsers = require('./index.js');

// Create an array with a couple of users so that we can test if it throws an error if you attempt to create a user with an emailAddress or username that already exists.
const currentUsers = [
    {
        username: 'some.dude',
        emailAddress: 'some.dude@example.com',
        password: 'testing'
    },
    {
        username: 'some.lady',
        emailAddress: 'some.lady@example.com',
        password: 'testing'
    }
];

describe('API v1', function() {
    describe('=> Users', function() {
        describe('=> CreateUser (POST /api/v1/users)', function() {
            // Before each test...
            beforeEach(function(done) {
                // Set the request and response objects equal to an empty object.
                req = res = {};

                // Create the spies for the .json and .status functions.
                res.json = sinon.spy();
                res.status = sinon.spy();
                // Default request body that is valid.
                req.body = {
                    username: 'first.last',
                    emailAddress: 'first.last@example.com',
                    password: 'testing'
                };
                req.models = {
                    identity: {
                        User: {}
                    }
                };

                // Create the Promise to mock the Sequelize data call.
                req.models.identity.User.create = function(obj) {
                    return new Promise(function(resolve, reject) {
                        // Validation for a defined, not null, and non-empty username...
                        if(_.isUndefined(obj.username) || _.isNull(obj.username) || _.eq(obj.username, '')) {
                            return reject(new Error('The username value must be defined, not null, and not empty.'));
                        }

                        // Validation for a defined, not null, and non-empty username...
                        if(_.isUndefined(obj.emailAddress) || _.isNull(obj.emailAddress) || _.eq(obj.emailAddress, '')) {
                            return reject(new Error('The emailAddress value must be defined, not null, and not empty.'));
                        }

                        // Validation for a defined, not null, and non-empty username...
                        if(_.isUndefined(obj.password) || _.isNull(obj.password) || _.eq(obj.password, '')) {
                            return reject(new Error('The password value must be defined, not null, and not empty.'));
                        }

                        // Loop over all of the objects in the currentUsers array...
                        _.forEach(currentUsers, function(user) {
                            // Validation for a unique username.
                            if(_.eq(obj.username, user.username)) {
                                return reject(new Error('The username value must be unique.'));
                            }

                            // Validation for a unique emailAddress.
                            if(_.eq(obj.emailAddress, user.emailAddress)) {
                                return reject(new Error('The emailAddress value must be unique.'));
                            }
                        });

                        return resolve({
                            safeReturnObj: {
                                id: '123456',
                                username: obj.username,
                                emailAddress: obj.emailAddress,
                                createdAt: '2016-10-11T13:46:47.081Z',
                                lastModifiedAt: '2016-10-11T13:46:47.081Z',
                                deletedAt: null
                            }
                        });
                    });
                };

                // Call the callback function.
                return done();
            });

            it('should call the res.status() function if all of the required parameters are defined, not null, and not empty.', function(done) {
                // Call the route's function...
                GetAllUsers(req, res, function() {
                    expect(res.status.calledOnce).to.equal(true);

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should call the res.json() function if all of the required parameters are defined, not null, and not empty.', function(done) {
                // Call the route's function...
                GetAllUsers(req, res, function() {
                    expect(res.json.calledOnce).to.equal(true);

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should have an object located in the data (Array) property of the JSON response.', function(done) {
                GetAllUsers(req, res, function() {
                    expect(res.json.args[0][0].data[0]).to.not.be.undefined;

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should have the id property of the user object in the data property of the JSON response.', function(done) {
                GetAllUsers(req, res, function() {
                    expect(res.json.args[0][0].data[0].id).to.not.be.undefined;

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should have the username property of the user object in the data property of the JSON response.', function(done) {
                GetAllUsers(req, res, function() {
                    expect(res.json.args[0][0].data[0].username).to.not.be.undefined;

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should have the emailAddress property of the user object in the data property of the JSON response.', function(done) {
                GetAllUsers(req, res, function() {
                    expect(res.json.args[0][0].data[0].emailAddress).to.not.be.undefined;

                    // Issue the callback to let the system know that the test is finished.
                    return done();
                });
            });

            it('should return an error object if the username is null.', function(done) {
                req.body.username = null;

                GetAllUsers(req, res, function(e) {
                    expect(e).to.exist;

                    return done();
                });
            });

            it('should return an error object if the username is empty.', function(done) {
                req.body.username = '';

                GetAllUsers(req, res, function(e) {
                    expect(e).to.exist;

                    return done();
                });
            });

            it('should return an error object if the emailAddress is null.', function(done) {
                req.body.emailAddress = null;

                GetAllUsers(req, res, function(e) {
                    expect(e).to.exist;

                    return done();
                });
            });

            it('should return an error object if the emailAddress is empty.', function(done) {
                req.body.emailAddress = '';

                GetAllUsers(req, res, function(e) {
                    expect(e).to.exist;

                    return done();
                });
            });
        });
    });
});