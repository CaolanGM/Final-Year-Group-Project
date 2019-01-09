const mongoose = require('mongoose');

// Event Schema
const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    event_type: {
        type: String
    },
    location: {
        type: String
    },
    seat_count: {
        type: Number
    },
    table_count: {
        type: Number
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    capacity: {
        type: Number,
        default: 0
    },
    donationTotal: {
        type: Number,
        default: 0
    },
    menuPath: {
        type: String,
        default: ""
    }
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.getAllEvents = function (callback) {
    Event.find(callback);
};

module.exports.getEventById = function (id, callback) {
    Event.findById(id, callback);
};

module.exports.getEventByName = function (eventName, callback) {
    const query = {name: eventName};
    Event.findOne(query, callback);
};

module.exports.addEvent = function (newEvent, callback) {
    newEvent.save(callback);
};

module.exports.updateDonation = function (event, amount, callback) {
    let newAmount = parseInt(amount);
    let updates = {$inc:{'donationTotal': newAmount}};
    Event.findByIdAndUpdate(event._id, updates, callback);
};
module.exports.updateMenu = function (event, path, callback) {
    event.menuPath = path;
    event.save(callback);
};
