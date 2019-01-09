const Event = require('../models/event');

//dates set as constants as DB returns error otherwise
module.exports.dates = dates = [
    new Date('2018-10-31'),
    new Date('2018-12-22'),
    new Date('2018-06-22')
];

module.exports.events = events = [
    new Event({
        name: 'Halloween bonanza',
        description: 'Spooky fun',
        location: 'Pumpkin Blvd',
        event_type: 'Dinner',
        seat_count: 70,
        table_count: 7,
        capacity: 70,
        date: dates[0]
    }),
    new Event({
        name: 'Christmas bonanza',
        description: 'Santy fun',
        location: 'Linux Labs',
        event_type: 'Dinner',
        seat_count: 50,
        table_count: 5,
        capacity: 50,
        date: dates[1]
    }),
    new Event({
        name: 'Summer bonanza',
        description: 'Sunny fun',
        location: 'The beach',
        event_type: 'Dinner',
        capacity: 500,
        date: dates[2]
    })
];


module.exports.seedEvents = function (finished) {
    let done = 0;
    for (let i = 0; i < events.length; i++) {
        console.log("Seeding event number = " + i);
        Event.getEventByName(events[i].name, (err, event) => {
            if (err) throw err;
            if (event) {
                console.log("Event already in database");
                done++;
                if (done === events.length) {
                    console.log("Finished Events");
                    finished();
                }
            } else {
                Event.addEvent(events[i], function (err, result) {
                    if (err) throw err;
                    console.log("Inserted event number " + i);
                    done++;
                    if (done === events.length) {
                        console.log("Finished Events");
                        finished();
                    }
                });
            }
        });
    }
};
