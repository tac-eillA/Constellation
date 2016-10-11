// Require the utility libraries.
var _ = require('lodash');

// Require the Node.js libraries.
var pg = require('pg');

// Require the default configuration information from the application.
var dbConfig = require('../config/postgres-config.js');

// Create the database client for the connection.
var client = new pg.Client({
    database: dbConfig.database,
    user: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port
});

_CreateConnection()
    .then(_CreateIdentitySchema)
    .catch(_HandleQueryErrors)
    .then(_CloseConnection);

/**
 * Create the database connection.
 *
 * @returns {Promise} - The ES6 promise that we create to wrap the callback functionality (to make the above process flow much cleaner).
 * @private
 */
function _CreateConnection() {
    return new Promise(function(resolve, reject) {
        // Create the connection to the database.
        client.connect(function(err) {
            // If there was an error...
            if(err) {
                // Reject the promise with the error.
                return reject(err);
            }

            // Resolve the promise.
            return resolve();
        });
    });
}

/**
 * Create the "identity" schema in the database, if it doesn't already exist.
 *
 * @returns {Promise} - The ES6 promise that we create to wrap the callback functionality (to make the above process flow much cleaner).
 * @private
 */
function _CreateIdentitySchema() {
    return new Promise(function(resolve, reject) {
        // Query the database to create the identity schema if it doesn't already exist...
        client.query('CREATE SCHEMA IF NOT EXISTS identity', function(err, result) {
            // If there was an error when creating the schema...
            if(err) {
                // Reject the promise with the error.
                return reject(err);
            }

            // Resolve the promise.
            return resolve();
        });
    });
}

/**
 * Close the connection to the database.
 *
 * @returns {Promise} - The ES6 promise that we create to wrap the callback functionality (to make the above process flow much cleaner).
 * @private
 */
function _CloseConnection() {
    return new Promise(function(resolve, reject) {
        // Close the database connection.
        client.end(function(err) {
            // If there was an error when closing the database connection...
            if(err) {
                // Reject the promise with the error.
                return reject(err);
            }

            // Resolve the promise.
            return resolve();
        });
    });
}

/**
 *
 * @param {Object} err - The Error object from any of the promises.
 * @private
 */
function _HandleQueryErrors(err) {
    // Log the error's stack trace.
    console.error(err.stack);
}