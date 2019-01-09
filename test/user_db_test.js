const expect = require('chai').expect;
const User = require('../models/user');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

describe('User', () => {
    it('should be invalid if email is empty', (done) => {
        let user = new User();
        user.name = 'Jack Example';
        user.username = 'username';
        user.password = 'password';
        user.validate((err) => {
            expect(err.errors.email).to.exist;
            done();
        })
    });

    it('should be invalid if username is empty', (done) => {
        let user = new User();
        user.name = 'Jack Example';
        user.email = 'email@email.com';
        user.password = 'password';
        user.validate((err) => {
            expect(err.errors.username).to.exist;
            done();
        })
    });

    it('should be invalid if password is empty', (done) => {
        let user = new User();
        user.name = 'Jack Example';
        user.username = 'username';
        user.email = 'email@email.com';
        user.validate((err) => {
            expect(err.errors.password).to.exist;
            done();
        })
    });

    it('should be valid if everything is there', (done) => {
        let user = new User();
        user.name = 'Jack Example';
        user.username = 'username';
        user.email = 'email@email.com';
        user.password = 'password';
        user.validate((err) => {
            expect(err).to.be.null;
            done();
        })
    });

    it('should get users by id', (done) => {
        let expectedUser = new User();
        sinon.stub(User, 'findById').yields(null, expectedUser);
        User.getUserById('id', (err, newUser) => {
            expect(err).to.be.null;
            expect(newUser).to.be.equal(expectedUser);
            done();
        });
    });

    it('should get users by username', (done) => {
        let expectedUser = new User();
        findOne = sinon.stub(User, 'findOne').yields(null, expectedUser);
        User.getUserByUsername('username', (err, newUser) => {
            expect(err).to.be.null;
            expect(newUser).to.be.equal(expectedUser);
            findOne.restore();
            done();
        });
    });

    it('should compare passwords', (done) => {
        compare = sinon.stub(bcrypt, 'compare').yields(false, true);
        User.comparePassword('candidate', 'hash', (err, isMatch) => {
            expect(isMatch).to.be.true;
            compare.restore();
            done();
        });
    });


});
