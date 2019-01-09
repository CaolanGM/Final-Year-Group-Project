const User = require('../models/user.js');
const mongoose = require('mongoose');
const config = require('../config/database');

// Connect to DB
mongoose.connect(config.development);
const admin = new User({
    name: 'admin',
    email: 'admin@gmail.com',
    username: 'admin',
    password: 'admin'
});

User.getUserByUsername(admin.username, (err, user) => {
    if (err) throw err;
    if (user) {
        console.log("Admin already in database");
        mongoose.disconnect();
    } else {
        User.addUser(admin, function (err, result) {
            if (err) throw err;
            console.log("No admin found in database, creating one now: " + result + ". Make sure to edit the details " +
                "of the profile by using the profile edit page.");
            mongoose.disconnect();
        });
    }
});
