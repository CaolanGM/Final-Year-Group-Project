const expect = require('chai').expect;
const Guest = require('../models/guest');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

describe('Guest', () => {
    it('should be invalid if email is empty', (done) => {
        let guest = new Guest();
        guest.name = 'Jack Example';
        guest.donationTotal = '300';
        guest.eventsAttended = '4';
        guest.validate((err) => {
            expect(err.errors.email).to.exist;
            done();
        })
    });

    it('should be invalid if eventsAttended is empty', (done) => {
        let guest = new Guest();
        guest.name = 'Jacques Example';
        guest.email = 'email@email.com';
        guest.donationTotal = '700000';
        guest.validate((err) => {
            expect(err.errors.eventsAttended).to.exist;
            done();
        })
    });

    it('should be invalid if donationTotal is empty', (done) => {
        let guest = new Guest();
        guest.name = 'Jacques Example';
        guest.eventsAttended = '5';
        guest.email = 'email@email.com';
        guest.validate((err) => {
            expect(err.errors.donationTotal).to.exist;
            done();
        })
    });

    it('should be valid if everything is there', (done) => {
        let guest = new Guest();
        guest.name = 'Jacques Example';
        guest.eventsAttended = '0';
        guest.email = 'email@email.com';
        guest.donationTotal = '0';
        guest.validate((err) => {
            expect(err).to.be.null;
            done();
        })
    });

    it('should get guests by id', (done) => {
        let expectedGuest = new Guest();
        sinon.stub(Guest, 'findById').yields(null, expectedGuest);
        Guest.getGuestById('id', (err, newGuest) => {
            expect(err).to.be.null;
            expect(newGuest).to.be.equal(expectedGuest);
            done();
        });
    });

    it('should get guests by email', (done) => {
        let expectedGuest = new Guest();
        findOne = sinon.stub(Guest, 'findOne').yields(null, expectedGuest);
        Guest.getGuestByEmail('email', (err, newGuest) => {
            expect(err).to.be.null;
            expect(newGuest).to.be.equal(expectedGuest);
            findOne.restore();
            done();
        });
    });



});
