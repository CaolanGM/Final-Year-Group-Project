const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Guest Schema
const GuestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        //unique: true
    },
    donationTotal: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    eventsAttended: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    dietary: {
        type: String,
    }
});


const Guest = module.exports = mongoose.model('Guest', GuestSchema);

module.exports.getRegularGuests = function (callback) {
    Guest.find().sort([['donationTotal', 'descending']]).exec(callback);
};

module.exports.getGuestById = function (id, callback) {
    Guest.findById(id, callback);
};

module.exports.addGuest = function (newGuest, callback) {
    newGuest.save(callback);
};

module.exports.getGuestByEmail = function (email, callback) {
    const query = {email: email};
    Guest.findOne(query, callback);
};

module.exports.updateDonation = function (guest, amount, callback) {
    let oldAmount = parseInt(guest.donationTotal);
    let newAmount = parseInt(amount);
    guest.donationTotal = newAmount + oldAmount;
    guest.save(callback);
};
