//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let User = require('./models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
let server = require('./app');
let guestId;
let token = "";

describe("Log in", function () {
    this.timeout(5000);
    beforeEach(function (done) {
        let newUser = new User({
            name: 'test',
            email: 'test@test.com',
            username: 'test',
            password: 'password'
        });
        User.addUser(newUser, function (err) {
            done();
        });
    });

    it('Log In Test', function (done) {
        chai.request(server).post("/api/users/authenticate")
            .set('content-type', 'application/json')
            .send({
                username: 'test',
                password: 'password'
            })
            .end(function (err, res) {
                should.exist(res);
                console.log(res.success);
                console.log(res.body.token);
                token = res.body.token;
                done();
            });
    });

});
describe("Add guest tests", function () {
    this.timeout(5000);
    it("gets added guest", function (done) {
        chai.request(server).post("/api/guests/register")
            .set('content-type', 'application/json')
            .set('authorization', token)
            .send({
                name: "John",
                email: "user@gmail.com",
                phone: "12345",
                donationTotal: 0,
                eventsAttended: 0,
                dietary: ""
            })
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('guest');
                chai.request(server)
                    .get('/api/guests/getById/' + res.body.guest._id)
                    .set('authorization', token)
                    .end(function (err, res) {
                        res.body.should.have.property('guest');
                        res.body.guest.should.have.property('name');
                        res.body.guest.name.should.equal('John');
                        res.body.guest.should.have.property('email');
                        res.body.guest.email.should.equal('user@gmail.com');
                        res.body.guest.should.have.property('phone');
                        res.body.guest.phone.should.equal('12345');

                        guestId = res.body.guest._id;
                        done();
                    });
            });
    });
    it("gets list of guests", function (done) {
        chai.request(server)
            .get("/api/guests/guest")
            .set('authorization', token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('gList');
                done();
            })
    });

    it("updates a guest", function (done) {
        chai.request(server)
            .post("/api/guests/add/" + guestId)
            .set('authorization', token)
            .send({
                name: "John",
                email: "user@gmail.com",
                phone: "12345",
                donationTotal: 100,
                eventsAttended: 5,
                dietary: "lactose intolerant"
            })
            .end(function (err, res) {
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('guest');
                chai.request(server)
                    .get('/api/guests/getById/' + guestId)
                    .set('authorization', token)
                    .end(function (err, res) {
                        res.body.should.have.property('guest');
                        res.body.guest.should.have.property('donationTotal');
                        res.body.guest.donationTotal.should.equal(100);
                        res.body.guest.should.have.property('eventsAttended');
                        res.body.guest.eventsAttended.should.equal(5);
                        res.body.guest.should.have.property('dietary');
                        res.body.guest.dietary.should.equal('lactose intolerant');

                        guestId = res.body.guest._id;
                        done();
                    });
            })
    })

});

let event_id;


describe("Event tests", function () {
    this.timeout(5000);
    it('should get list of events', function (done) {

        chai.request(server)
            .get('/api/events/getAll')
            .set('authorization', token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('eventList');
                done();
            });
    });

    it('should successfully save and retrieve event', function (done) {
        chai
            .request(server)
            .post('/api/events/add')
            .set('content-type', 'application/json')
            .set('authorization', token)
            .send({
                name: 'test',
                description: 'DB test',
                event_type: 'Run',
                location: 'The DB',
                seat_count: 10,
                table_count: 1,
                date: Date.now(),
                capacity: 100
            })
            .end(function (error, res, body) {
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('event');
                chai.request(server)
                    .get('/api/events/getById/' + res.body.event._id)
                    .set('authorization', token)
                    .end(function (err, res) {
                        res.body.should.have.property('event');
                        res.body.event.should.have.property('name');
                        res.body.event.name.should.equal('test');
                        res.body.event.should.have.property('description');
                        res.body.event.description.should.equal('DB test');
                        event_id = res.body.event._id;
                        done();
                    });
            });
    });


    it('should successfully update event', function (done) {
        chai
            .request(server)
            .post('/api/events/add/' + event_id)
            .set('authorization', token)
            .send({
                name: 'updated test',
                description: 'DB test updated',
                event_type: 'Run',
                location: 'The DB',
                seat_count: 10,
                table_count: 1,
                date: Date.now(),
                capacity: 100
            })
            .end(function (err, res, body) {
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('event');
                res.body.event.name.should.equal('updated test');
                done();
            });
    });
});
