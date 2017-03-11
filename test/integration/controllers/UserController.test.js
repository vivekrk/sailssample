
/** 
 * Test model: UserModel.test.js
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @sails docs  :: http://sailsjs.org/documentation/concepts/testing - 
 * @chai docs	:: http://chaijs.com/guide/styles/
 * @sinon docs	:: http://sinonjs.org/docs/
 * @supertest 	:: https://github.com/visionmedia/supertest
 */
"use strict";

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var request = require('supertest');
var expect =  chai.expect;

//TODO: you must create the defining test
var data = {};

describe('Controller:User', () => { 

	describe('POST /User', () => {
        it('Should created new User', done => {
            request(sails.hooks.http.app)
            .post(sails.config.blueprints.prefix + '/User')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            	if (err) {
                    return done(err);
                }
                //TODO: validate the response expected
                expect(res.body.code).to.equal('CREATED');
                done();
            });
        });
    });

	describe('GET /User', () => {
        it('Should getted User', done => {
            request(sails.hooks.http.app)
            .get(sails.config.blueprints.prefix + '/User')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            	if (err)
                    return done(err);
                
                //TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                data = res.body.data[0];
                done();
            });
        });
    });

    //TODO: you must create the defining logic to get by id
	var id = 0;

	describe('GET /User/:id', () => {
        it('should respond with the requested User:id', done => {
            request(sails.hooks.http.app)
            .get(sails.config.blueprints.prefix + '/User/' + data.id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err)
                    return done(err);

                //TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                done();
            });
        });
    });

    describe('PUT /User/:id', () => {
    	it('should respond updated User', done => {
            request(sails.hooks.http.app)
            .put(sails.config.blueprints.prefix + '/User/' + data.id)
            .send(data)            
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err)
                    return done(err);

            	//TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                done();
            });
        });
    });

    describe('DELETE /User/:id', () => {
    	it('should respond with 204 on successful removal', done => {
            request(sails.hooks.http.app)
            .delete(sails.config.blueprints.prefix + '/User/' + data.id)
            .expect(204)            
            .end((err, res) => {
                if (err)
                    return done(err);

                expect(res.statusCode).to.equal(204);
                done();
            });
        });
    });

    //Clear User after testing
     after(function() {
        return User.destroy();
    });
});

