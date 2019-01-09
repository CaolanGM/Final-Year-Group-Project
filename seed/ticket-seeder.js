const Ticket = require('../models/ticket');
const Event = require('../models/event');

module.exports.tickets = tickets = [
    new Ticket({
        seat: 1,
        table: 1,
        paid: false,
        date_bought: new Date(year = 2013, month = 1, day = 12),
        dietary_preferences: 'None',
        extra_comments: 'Test 1'
    }),
    new Ticket({
        seat: 2,
        table: 1,
        paid: false,
        date_bought: new Date(year = 2014, month = 2, day = 2),
        dietary_preferences: 'No veg plz',
        extra_comments: 'Test 2'
    }),
    new Ticket({
        seat: 1,
        table: 2,
        paid: true,
        date_bought: new Date(year = 2013, month = 1, day = 12),
        dietary_preferences: 'Vegetarian',
        extra_comments: 'Test 3'
    })
];

module.exports.seedTickets = function(finished) {
// Creating some tickets for the halloween bonanza event.
    const event = Event.getEventByName('Halloween bonanza', (err, event) => {
            if (err) throw err;
            if (event) {
                this.assignTicketsToEvent(event, finished);
            } else {
                console.log("Could Not find event.")
            }
        }
    );
};

module.exports.assignTicketsToEvent = function (event, finished) {
    let done = 0;
    for (let i = 0; i < tickets.length; i++) {
        console.log("Seeding ticket number = " + i);
        tickets[i].event = event._id;
        Ticket.getTicketByExtraComments(tickets[i].extra_comments, (err, ticket) => {
            if (err) throw err;
            if (ticket) {
                console.log("Ticket already in database");
                done++;
                if (done === tickets.length) {
                    console.log("Finished Tickets");
                    finished();
                }
            } else {
                Ticket.addTicket(tickets[i], function (err, result) {
                    if (err) throw err;
                    console.log("Inserted ticket number " + i);
                    done++;
                    if (done === tickets.length) {
                        console.log("Finished Tickets");
                        finished();
                    }
                });
            }
        });
    }
};
