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
                req.models.identity.user.findAndCountAll = function(obj) {
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

                        // If the emailAddress is one of the requested fields...
                        if(_.includes(obj.attributes, 'emailAddress')) {
                            users[0].emailAddress = 'some.dude@example.com';
                            users[1].emailAddress = 'some.lady@example.com';
                            users[2].emailAddress = 'second.dude@example.com';
                            users[3].emailAddress = 'second.lady@example.com';
                        }

                        // If the createdTs is one of the requested fields...
                        if(_.includes(obj.attributes, 'createdTs')) {
                            users[0].createdTs = '2016-10-22T03:53:40.298Z';
                            users[1].createdTs = '2016-10-22T03:53:40.298Z';
                            users[2].createdTs = '2016-10-22T03:53:40.298Z';
                            users[3].createdTs = '2016-10-22T03:53:40.298Z';
                        }

                        // If the lastModifiedTs is one of the requested fields...
                        if(_.includes(obj.attributes, 'lastModifiedTs')) {
                            users[0].lastModifiedTs = '2016-10-22T03:53:40.298Z';
                            users[1].lastModifiedTs = '2016-10-22T03:53:40.298Z';
                            users[2].lastModifiedTs = '2016-10-22T03:53:40.298Z';
                            users[3].lastModifiedTs = '2016-10-22T03:53:40.298Z';
                        }

                        // If the deletedTs is one of the requested fields...
                        if(_.includes(obj.attributes, 'deletedTs')) {
                            users[0].deletedTs = null;
                            users[1].deletedTs = null;
                            users[2].deletedTs = null;
                            users[3].deletedTs = null;
                        }

                        // Return the users based upon the offset and limit passed.
                        users = _.slice(users, obj.offset, (obj.limit * obj.offset));

                        // If the
                        //if(_.includes(obj.sort, ' asc'))

                        // Return the resolved promise with the
                        return resolve({
                            count: _.size(users),
                            rows: users
                        });
                    });
                };

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