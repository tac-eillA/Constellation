var policies = {
    auth: {
        isAuthenticated: require('./auth/isAuthenticated.js')
    },
    getCollection: {
        hasRequiredQueryParameters: require('./getCollection/hasRequiredQueryParameters.js')
    }
};

module.exports = policies;