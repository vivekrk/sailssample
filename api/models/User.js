/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    attributes: {
        'firstname': {
            type: 'string',
            required: true
        },
        'lastname': {
            type: 'string'
        },
        'email': {
            type: 'email',
            unique: true,
            required: true
        },
        'encryptedPassword': {
            type: 'string'
        },
        toJSON: function() {
        	var obj = this.toObject();
        	delete obj.encryptedPassword;
        	return obj;
        }
    },

    /* Lifecycle Callbacks */
    beforeCreate: function(values, cb) {
    	if(!values.password || !values.confirmation || values.password != values.confirmation) {
    		return cb({err: ["Password does not match confirmation"]});
    	}
        // Hash password
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return cb(err);
            values.encryptedPassword = hash;

            //Delete the passwords so that they are not stored in the DB
            delete values.password;
            delete values.confirmation;

            //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
            cb();
        });
    }
};