const express = require('express');
const router = express.Router();
const passport = require('passport');
const Event = require('../models/event');
const Attendance = require('../models/attendance');


router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        event_type: req.body.event_type,
        location: req.body.location,
        date: req.body.date,
        capacity: req.body.capacity,
        seat_count: req.body.seat_count,
        table_count: req.body.table_count
    });
    Event.addEvent(newEvent, (err, insertedEvent) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                success: true,
                event: insertedEvent
            });
        }
    });
});


router.post('/add/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let id = req.params.id;
    let updates = req.body;
    Event.findByIdAndUpdate(id, updates, {new: true}, (err, insertedEvent) => {
    if (err) {
        console.log(err);
    }
    else {
        res.json({
        success: true,
        event: insertedEvent
    });
}
});
});

router.get('/getAll', function (req, res) {
    Event.find()
        .exec(function (err, events) {
            if (err) {
                console.log("Error retrieving guests");
                console.log(err);
            }
            else {
                res.json({eventList: events});
            }
        });

});

router.get('/guests/:name', passport.authenticate('jwt', {session: false}), function (req, res) {
    let eventName = req.params.name;
    Event.getEventByName(eventName, (err, event) => {
        if (err) {
            console.log("ERR " + err);
            res.json({});
        }
        if (event) {
            Attendance.getAttendanceByEvent(event._id, (err, attendance) => {
                if (err) {
                    console.log(err);
                    res.json({event:event});
                }
                if (attendance) {
                    res.json({event: event, gList: attendance});
                } else {
                    res.json({event: event})
                }
            });
        } else {
            console.log("No event found for " + eventName);
            res.json({});
        }
    });
});

router.get('/getById/:id', function(req, res){
    let eventId = req.params.id;
    Event.getEventById(eventId, (err, event) => {
        res.json({event: event});
    });
});

router.post('/donation/:id/:amount', (req, res, next) => {
    const id = req.params.id;
    const amount = req.params.amount;
    Event.getEventById(id, (err, attendee) => {
        if (err) throw err;
        if (!attendee) {
            return res.json({success: false, msg: 'User not found'});
        }

        Event.updateDonation(attendee,amount, (err, attendence) => {
            if (err) {
                res.json({success: false, msg: 'Failed to update user ' + err});
            } else {
                res.json({
                    success: true,
                    msg: 'Event updated',
                  
                });
            }
        });


      });
});

router.post('menu/:id', (req, res, next) => {
    const id = req.params.id;
    Event.getEventById(id, (err, event) => {
        if (err) throw err;
        Event.updateMenuPath()

    });
});




module.exports = router;
