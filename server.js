'use strict';

// Helper libraries.
var _ = require('lodash');

// Create the server.
var express = require('express');
var app = express();

// Middleware libraries.
var bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    csurf = require('csurf'),
    expressSession = require('express-session'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    pg = require('pg'),
    serveStatic = require('serve-static');

// Local configuration information.
var pgConfig = require('./config/postgres-config.js'),
    passportConfig = require('./config/passport.js'),
    modelsConfig = require('./models'),
    serverConfig = require('./config/server-config.js');

// Launch the promise chain to build the application structure.
modelsConfig.sequelize
    .sync({ logging: console.log })
    .then(_InitializeMiddleware)
    .then(_InitializeSession)
    .then(_BindToRequestObject)
    .then(_BindRoutes)
    .then(_StartServer)
    .catch(_HandleErrors);

/**
 *
 * @returns {Promise}
 * @private
 */
function _InitializeMiddleware() {
    return new Promise(function(resolve, reject) {
        // Set up some basic security protocols to help prevent attacks and security flaws.
        app.use(helmet());

        // Serve up the static files and allow it to serve cached files if necessary (not available through the express.static() functionality).
        app.use('/', serveStatic('public', { 'index': ['index.html'] }));

        // Set up the body parser.
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        return resolve();
    });
}

/**
 *
 * @returns {Promise}
 * @private
 */
function _InitializeSession() {
    return new Promise(function(resolve, reject) {
        let PgSession = require('connect-pg-simple')(expressSession);
        let session = {
            name: 'constellationSid',
            saveUninitialized: false,
            resave: false,
            secret: '6cbBX36:T;ap2QIZ;vL,Lw<35|CBN6',
            unset: 'destroy',
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: null
            },
            store: new PgSession({
                pg: pg,
                conString: 'postgres://' + pgConfig.username + ':' + pgConfig.password + '@' + pgConfig.host + ':' + pgConfig.port + '/' + pgConfig.database,
                schemaName: 'identity',
                tableName: 'user_sessions'
            })
        };

        // Set up the cookie parser.
        app.use(cookieParser(session.secret));

        // Set up the session.
        app.use(expressSession(session));

        // Include the Passport.js authentication engine.
        app.use(passportConfig.initialize());
        app.use(passportConfig.session());

        // Set up the CSRF protection middleware.
        // TODO: Once we have the UI fully-functional, we will need to make sure to enable CSRF protection for the POST, PUT, and DELETE routes.
        app.use(csurf({
            cookie: false,
            ignoreMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']
        }));

        // Initialize the logging functionality for HTTP requests.
        app.use(morgan('combined', {
            immediate: true
        }));

        // Resolve the promise.
        return resolve();
    });
}

/**
 *
 * @returns {Promise}
 * @private
 */
function _BindToRequestObject() {
    return new Promise(function(resolve, reject) {
        // Set up the database models so that they can be used in the request (req) object within each route.
        app.use(function(req, res, next) {
            // Bind the modelsConfig object to the request object.
            req.models = modelsConfig;

            // Go to the next functionality in the Express pipeline.
            return next();
        });

        // Resolve the promise.
        return resolve();
    });
}

/**
 *
 * @returns {Promise}
 * @private
 */
function _BindRoutes() {
    return new Promise(function(resolve, reject) {
        // Bind the public API routes.
        app.use('/api', require('./routes/api'));

        // Bind the authentication routes.
        app.use(require('./routes/auth'));

        // Bind the private API routes.
        //app.use('/private', require('./routes/private'));

        // Bind the 404 (Not Found) Error handler.
        app.use(require('./routes/errors/NotFound.js'));

        // Bind the non-404 / non-200 Error handler.
        app.use(require('./routes/errors/RouteError.js'));

        // Resolve the Promise.
        return resolve();
    });
}

/**
 *
 * @returns {Promise}
 * @private
 */
function _StartServer() {
    return new Promise(function(resolve, reject) {
        app.listen(serverConfig.port, serverConfig.hostname, resolve);
    });
}

/**
 *
 * @param {Object} e
 * @private
 */
function _HandleErrors(e) {
    console.error(e.stack);
}