const expect = require('chai').expect;
const Event = require('../models/event');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

describe('Event', () => {
    it('should be invalid if name is empty', (done) => {
        let event = new Event({
            description: 'Descriptions',
            event_type: 'Dinner',
            location: 'Dublin'
        });
        event.validate((err) => {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be valid if name is present', (done) => {
        let event = new Event({
            name: 'Bonanza',
            description: 'Descriptions',
            event_type: 'Dinner',
            location: 'Dublin'
        });
        event.validate((err) => {
            expect(err).to.be.null;
            done();
        });
    });

    it('should have date be filled in by default', (done) => {
        let event = new Event({
            name: 'Bonanza',
            description: 'Descriptions',
            event_type: 'Dinner',
            location: 'Dublin'
        });
        event.validate((err) => {
            expect(err).to.be.null;
            expect(event.date).to.be.not.null;
            done();
        });
    });

    it('should have capacity be zero by default', (done) => {
        let event = new Event({
            name: 'Bonanza',
            description: 'Descriptions',
            event_type: 'Dinner',
            location: 'Dublin'
        });
        event.validate((err) => {
            expect(err).to.be.null;
            expect(event.capacity).to.be.equal(0);
            done();
        });
    });


    it('should get all events', (done) => {
        let expectedEvents = [new Event()];
        sinon.stub(Event, 'find').yields(null, expectedEvents);
        Event.getAllEvents((err, newEvents) => {
            expect(err).to.be.null;
            expect(newEvents.length).to.be.equal(1);
            expect(newEvents[0]).to.be.equal(expectedEvents[0]);
            done();
        });
    });

    it('should get events by id', (done) => {
        let expectedEvent = new Event();
        findById = sinon.stub(Event, 'findById').yields(null, expectedEvent);
        Event.getEventById('id', (err, newEvent) => {
            expect(err).to.be.null;
            expect(newEvent).to.be.equal(expectedEvent);
            findById.restore();
            done();
        });
    });

    it('should get event by name', (done) => {
        let expectedEvent = new Event();
        findById = sinon.stub(Event, 'findOne').yields(null, expectedEvent);
        Event.getEventById('Event name', (err, newEvent) => {
            expect(err).to.be.null;
            expect(newEvent).to.be.equal(expectedEvent);
            findById.restore();
            done();
        });
    });

    it('should save a new event', (done) => {
        let event = new Event();
        saveEvent = sinon.stub(event, 'save').yields(null, event);
        Event.addEvent(event, (err, newEvent) => {
           expect(newEvent).to.be.equal(event);
           done();
        });
    });


});