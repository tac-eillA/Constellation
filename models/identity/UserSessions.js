var _bcrypt = require('bcryptjs'),
    _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'user_sessions',
        {
            sid: {
                type: DataTypes.STRING(255),
                field: 'sid',
                primaryKey: true,
                allowNull: false
            },
            sess: {
                type: DataTypes.JSON,
                field: 'sess',
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'The sess value must not be empty.'
                    }
                }
            },
            expire: {
                type: DataTypes.DATE,
                field: 'expire',
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'The expire value must not be empty.'
                    }
                }
            }
        },
        {
            // Set the name for the table.
            tableName: 'user_sessions',
            // Set the schema name for the table.
            schema: 'identity',
            // State that the column names use underscores instead of camelCase.
            underscored: true,
            // Set that the timestamps should be populated.
            timestamps: false
        }
    );
};