const expect = require('chai').expect;
const Attendance = require('../models/attendance');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

describe('Attendance', () => {
    it('should be valid with no fields set', (done) => {
        let attendance = new Attendance();
        attendance.validate((err) => {
            expect(err).to.be.null;
            done();
        });
    });

    it('should have ticket_amount set to zero by default', (done) => {
        let attendance = new Attendance();
        attendance.validate((err) => {
            expect(err).to.be.null;
            expect(attendance.ticket_amount).to.be.equal(0);
            done();
        });
    });

    it('should have invited set to false by default', (done) => {
        let attendance = new Attendance();
        attendance.validate((err) => {
            expect(err).to.be.null;
            expect(attendance.invited).to.be.false;
            done();
        });
    });

    it('should have rsvp set to false by default', (done) => {
        let attendance = new Attendance();
        attendance.validate((err) => {
            expect(err).to.be.null;
            expect(attendance.rsvp).to.be.false;
            done();
        });
    });

    it('should update rsvp to true', (done) => {
        let attendance = new Attendance();
        expect(attendance.rsvp).to.be.false;
        sinon.stub(attendance, 'save').yields(null, attendance);
        Attendance.updateRSVP(attendance, (err, updatedAttendance) => {
            expect(updatedAttendance.rsvp).to.be.true;
            done();
        })
    });
});