const User = require('../models/user.js');

module.exports.users = users = [
    new User({
        name: 'Tinny Tim',
        email: 'tinnytim@gmail.com',
        username: 'TinnyTim96',
        password: 'bravosir!'
    }),
    new User({
        name: 'Kif Kroker',
        email: 'kiffyk@nimbus.com',
        username: 'Kif',
        password: 'greenguy'
    }),
    new User({
        name: 'Zapp Brannigan',
        email: 'brannigan@nimbus.com',
        username: 'BigBoyBrannigan',
        password: 'password'
    }),
    new User({
        name: 'Luke',
        email: 'Luke@luke.com',
        username: 'luke',
        password: 'luke'
    })
];

module.exports.seedUsers = function (finished) {
    let done = 0;
    for (let i = 0; i < users.length; i++) {
        console.log("Seeding user number = " + i);
        User.getUserByUsername(users[i].username, (err, user) => {
            if (err) throw err;
            if (user) {
                console.log("User already in database");
                done++;
                if (done === users.length) {
                    console.log("Finished Users");
                    finished();
                }
            } else {
                User.addUser(users[i], function (err, result) {
                    if (err) throw err;
                    console.log("Inserted user number " + i);
                    done++;
                    if (done === users.length) {
                        console.log("Finished Users");
                        finished();
                    }
                });
            }
        });
    }
};