/**
 * Created by @cpmproto
 */
 
"use strict";

var Sails = require('sails');
var config = require('../config/env/test');
var sails;

before(function(done) {
    this.timeout(4000);

    Sails.lift(config, function(err, server) {
        sails = server;
        if (err) return done(err);
        done(err, sails);
    });
});

after(function(done) {
    Sails.lower(done);
});