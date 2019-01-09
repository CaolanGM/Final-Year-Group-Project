const mongoose = require('mongoose');

// Attendance Schema
const AttendanceSchema = mongoose.Schema({
    rsvp: {
        type: Boolean,
        default: false
    },
    invited: {
        type: Boolean,
        default: false
    },
    ticket_amount: {
        type: Number,
        default: 0
    },
    eventDonation: {
        type: Number,
        default: 0
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }
});

const Attendance = module.exports = mongoose.model('Attendance', AttendanceSchema);

module.exports.getAttendance = function (eventId, guestId, callback) {
    const query = {event: eventId, guest: guestId};
    Attendance.findOne(query, callback);
};

module.exports.getAttendanceByEvent = function (eventId, callback) {
    const query = {event: eventId};
    Attendance.find(query, callback).populate('guest').populate('event');
};

module.exports.getAttendanceById = function (id, callback) {
    Attendance.findById(id, callback).populate('guest').populate('event');
};
module.exports.updateRSVP = function (attendee, callback) {
    attendee.rsvp = true;
    attendee.save(callback);
};

module.exports.updateDonation = function (attendee, amount, callback) {
    let oldAmount = parseInt(attendee.eventDonation);
    let newAmount = parseInt(amount);
    attendee.eventDonation = newAmount + oldAmount;
    attendee.save(callback);
};


module.exports.addAttendance = function (attendance, callback) {
    attendance.save(callback)
};
