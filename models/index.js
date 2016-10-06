var _connection = require('../config/postgres-config.js'),
    _Sequelize = require('sequelize');

var _sequelize = new _Sequelize(
    _connection.database,
    _connection.username,
    _connection.password,
    {
        host: _connection.host,
        port: _connection.port,
        dialect: _connection.type,
        protocol: _connection.type,
        dialectOptions: {
            ssl: _connection.ssl
        }
    }
);

var db = {
    Sequelize: _Sequelize,
    sequelize: _sequelize,
    identity: require('./identity')(_sequelize)
};

// Define the associations between the models.

module.exports = db;