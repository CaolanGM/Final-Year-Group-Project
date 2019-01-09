const Guest = require('../models/guest.js');

module.exports.guests = guests = [
    new Guest({
        name: 'Tim',
        email: 'tim@gmail.com',
        phone: '0863657689',
        donationTotal: 0,
        eventsAttended: 0,
        dietary: 'Vegan'
    }),
    new Guest({
        name: 'Jim',
        email: 'jim@gmail.com',
        phone: '0892734663657689',
        donationTotal: 100,
        eventsAttended: 2
    }),
    new Guest({
        name: 'Bim',
        email: 'bim@gmail.com',
        phone: '0863657689',
        donationTotal: 50000,
        eventsAttended: 0,
        dietary: 'Only eats eel'
    }),
    new Guest({
        name: 'Kim',
        email: 'kim@gmail.com',
        phone: '086365768849',
        donationTotal: 23,
        eventsAttended: 5
    })
];

module.exports.seedGuests = function(finished) {
    let done = 0;
    for (let i = 0; i < guests.length; i++) {
        console.log("Seeding guest number = " + i);
        Guest.getGuestByEmail(guests[i].email, (err, guest) => {
            if (err) throw err;
            if (guest) {
                console.log("Guest already in database.");
                done++;
                if (done === guests.length) {
                    console.log("Finished Guests");
                    finished();
                }
            } else {
                Guest.addGuest(guests[i], function (err, insertedGuest) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Inserted guest number " + i);
                    }
                    done++;
                    if (done === guests.length) {
                        console.log("Finished Guests");
                        finished();
                    }
                });
            }
        });
    }
};