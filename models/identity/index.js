module.exports = function identity(sequelize) {
    return {
        User: sequelize.import(__dirname + '/User.js'),
        UserSessions: sequelize.import(__dirname + '/UserSessions.js')
    };
};