/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

    _config: {
        actions: true,
        shortcuts: false,
        rest: false
    },
    'check': function(req, res) {
        //console.log(req.user);
        return res.json(req.user);
    },

    'signup': function(req, res) {
        User.create(req.body).exec(function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(user);
        });
    },

    'login': function(req, res) {
        //Return error if email or password are not passed
        if (!req.body.email || !req.body.password) {
            return res.badRequest({
                err: "Email or password cannot be empty"
            });
        }
        //Find the user from email
        User.findOne({
            email: req.body.email
        }).exec(function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            if (!user) {
                return res.notFound({err: 'Could not find email,' + req.body.email + ' sorry.'});
            }
            //Compare the password
            bcrypt.compare(req.body.password, user.encryptedPassword, function(err, result) {
                if(result) {
                	//password is a match
                	return res.json({
                        user:user,
                        token: jwToken.sign(user)
                    });
                } else {
                	//password is not a match
                	return res.forbidden({err: 'Email and password combination do not match'});
                }
            });
        });
    }
};