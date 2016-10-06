var _bcrypt = require('bcryptjs'),
    _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                field: 'id',
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                field: 'username',
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'The username value must not be empty.'
                    },
                    min: {
                        args: 8,
                        msg: 'The username value must be at least 8 characters.'
                    }
                }
            },
            emailAddress: {
                type: DataTypes.STRING,
                field: 'email_address',
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'The emailAddress value must not be empty.'
                    },
                    isEmail: {
                        msg: 'The emailAddress value must be in email form (user@company.com).'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                field: 'password',
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'The password value must not be empty.'
                    }
                }
            },
            safeReturnObj: {
                type: DataTypes.VIRTUAL,
                get: function() {
                    return {
                        id: this.getDataValue('id'),
                        username: this.getDataValue('username'),
                        emailAddress: this.getDataValue('emailAddress'),
                        createdTs: this.getDataValue('createdAt'),
                        lastModifiedTs: this.getDataValue('updatedAt'),
                        deletedTs: this.getDataValue('deletedAt')
                    };
                }
            }
        },
        {
            // Set the name for the table.
            tableName: 'user',
            // Set the schema name for the table.
            schema: 'identity',
            // State that the column names use underscores instead of camelCase.
            underscored: true,
            // Set that the timestamps should be populated.
            timestamps: true,
            // Set the column name for the "createdAt" timestamp for each new record.
            createdAt: 'created_ts',
            // Set the column name for the "updatedAt" timestamp for when each record is modified.
            updatedAt: 'last_modified_ts',
            // Set the column name for the "deletedAt" timestamp for when the record is supposed to be deleted (halted by the paranoid attribute below).
            deletedAt: 'deleted_ts',
            // Set the paranoid attribute so that the records are never truly deleted.
            paranoid: true,

            // Hooks
            hooks: {
                beforeCreate: _HashPassword,
                beforeUpdate: _HashPassword
            }
        }
    );
};

/**
 * Hash functionality that turns the user's provided password into the proper hash to be stored in the database instead of the bare password.
 *
 * @param {Object} user
 * @param {Object} options
 * @param {Function} next
 * @private
 */
function _HashPassword(user, options, next) {
    // Generate the salt to be used.
    _bcrypt.genSalt(10, function(saltErr, salt) {
        // If the salt generation failed...
        if(_.isUndefined(salt) || _.isNull(salt)) {
            // Throw a server error.
            return next(saltErr);
        }

        // Hash the user's password with the salt that was just generated.
        _bcrypt.hash(user.getDataValue('password'), salt, function(hashErr, hash) {
            // If the hashing function failed...
            if(_.isUndefined(hash) || _.isNull(hash)) {
                // Throw a server error.
                return next(hashErr);
            }

            // Set the value of the user's password equal to the hash that was just created so that the hash is stored in the database instead of the bare password.
            user.setDataValue('password', hash);
            return next();
        });
    });
}