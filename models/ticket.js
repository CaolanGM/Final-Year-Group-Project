const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const hashids = require('hashids');

// Ticket Schema
const TicketSchema = mongoose.Schema({
    ticket_code: {
        type: String,
        default: "None"
    },
    ticket_number: {
        type: Number
    },
    seat: {
        type: String
    },
    table: {
        type: String,
        default: "TBD"
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    date_bought: {
        type: Date,
        default: Date.now()
    },
    dietary_preferences: {
        type: String,
        required: false,
        default: "None"
    },
    extra_comments: {
        type: String,
        required: false,
        default: "None"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    bought_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }
});

autoIncrement.initialize(mongoose.connection);

TicketSchema.plugin(autoIncrement.plugin, {
    model: 'Ticket',
    field: 'ticket_number'
});

TicketSchema.pre('save', function (next) {
    this.ticket_code = new hashids("salt please").encode(this.ticket_number);
    next();
});
const Ticket = module.exports = mongoose.model('Ticket', TicketSchema);

module.exports.getTicketById = function (id, callback) {
    Ticket.findById(id, callback);
};

module.exports.getTickets = function (guest_id, event_id, callback) {
    const query = {event: event_id, bought_by: guest_id};
    Ticket.find(query, callback);
};

module.exports.getTicketByTicketCode = function (ticketCode, callback) {
    const query = {ticket_code: ticketCode};
    Ticket.findOne(query, callback);
};

module.exports.getTicketByExtraComments = function (extraComment, callback) {
    const query = {extra_comments: extraComment};
    Ticket.findOne(query, callback);
};

module.exports.addTicket = function (newTicket, callback) {
    newTicket.save(callback);
};
