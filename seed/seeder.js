const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user-seeder');
const Guest = require('./guest-seeder');
const Event = require('./event-seeder');
const Ticket = require('./ticket-seeder');
const Attendance = require('./attendance-seeder');

// Connect to DB
mongoose.connect(config['development']);

done = function () {
    console.log("disconnecting");
    mongoose.disconnect();
};

User.seedUsers(() => {
   Guest.seedGuests(() => {
       Event.seedEvents(() => {
           Ticket.seedTickets(() => {
               Attendance.seedAttendees(() => {
                   done();
               })
           })
       })
   })
});

