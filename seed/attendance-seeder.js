const Event = require('../models/event');
const Guest = require('../models/guest');
const Attendance = require('../models/attendance');


module.exports.seedAttendees = function (finished) {
    const event = Event.getEventByName('Halloween bonanza', (err, event) => {
            if (err) throw err;
            if (event) {
                Guest.find().exec(function (err, guests) {
                    if (err) {
                        console.log("Error retrieving guests");
                    }
                    else {
                        let attendances = [
                            new Attendance({
                                event: event._id,
                                guest: guests[0]._id
                            }),
                            new Attendance({
                                event: event._id,
                                guest: guests[2]._id
                            }),
                            new Attendance({
                                event: event._id,
                                guest: guests[1]._id
                            })
                        ];
                        let done = 0;
                        for (let i = 0; i < attendances.length; i++) {
                            Attendance.addAttendance(attendances[i], function (err, result) {
                                if (err) throw err;
                                console.log("Inserted attendance.");
                                done++;
                                if (done === attendances.length) {
                                    console.log("Finished Attendences");
                                    finished();
                                }
                            });
                        }
                    }
                });
            } else {
                console.log("Could Not find event.")
            }
        }
    );
};
