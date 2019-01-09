const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Attendance = require('../models/attendance');
const Ticket = require('../models/ticket')
const Guest = require('../models/guest');
const Event = require('../models/event');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

router.post('/add', (req, res, next) => {
    let newAttendance = new Attendance({
        event: req.body.event,
        guest: req.body.guest
    });
    Attendance.getAttendance(req.body.event, req.body.guest, (err, attendance) => {
        if (err) {
            console.log(err);
        }
        if (attendance) {
            res.json({
                success: false,
                msg: "User already attending this event."
            });
        } else {
            Attendance.addAttendance(newAttendance, (err, insertedAttendance) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        success: true,
                        attendance: insertedAttendance
                    });
                }
            });
        }
    });
});

router.post('/rsvp/:id', (req, res, next) => {
    const id = req.params.id;
    Attendance.getAttendanceById(id, (err, attendee) => {
        if (err) throw err;
        if (!attendee) {
            return res.json({success: false, msg: 'User not found'});
        }

        Attendance.updateRSVP(attendee, (err, attendence) => {
            if (err) {
                res.json({success: false, msg: 'Failed to update user ' + err});
            } else {
                res.json({
                    success: true,
                    msg: 'Attendance updated',
                    attendance: {
                        id: attendence._id,
                        ticket_amount: attendence.ticket_amount,
                        rsvp: attendence.rsvp
                    }
                });
            }
        });
    });
});


router.post('/donation/:id/:amount', (req, res, next) => {
    const id = req.params.id;
    const amount = req.params.amount;
    Attendance.getAttendanceById(id, (err, attendee) => {
        if (err) throw err;
        if (!attendee) {
            return res.json({success: false, msg: 'User not found'});
        }
        Guest.updateDonation(attendee.guest, amount, () => {
            if (err) {
                console.log("Could not find guest to update the donation.");
            }
        });
        Event.updateDonation(attendee.event, amount, () => {
            if (err) {
                console.log("Could not find event to update the donation.");
            }
        });
        Attendance.updateDonation(attendee, amount, (err, attendence) => {
            if (err) {
                res.json({success: false, msg: 'Failed to update user ' + err});
            } else {
                res.json({
                    success: true,
                    msg: 'Attendance updated',
                    attendance: {
                        id: attendence._id,
                        ticket_amount: attendence.ticket_amount,
                        rsvp: attendence.rsvp
                    }
                });
            }
        });


    });
});

router.post('/email', (req, res, next)=>{
    var attendees = req.body.attendees;
    var catererEmail = req.body.catererEmail;
    var message = ""
    //have to do this because javascript is bs
    var i = 0;
    var recursiveForLoop = function(attendees){
        Attendance.getAttendanceById(attendees[i], (err, attendee)=>{
            Guest.getGuestById(attendee.guest, (err, guest) =>{
                Ticket.getTickets(guest.id, attendee.event.id, (err, tickets)=>{
                    if(tickets.length > 0){
                        console.log (guest.name+" - "+guest.dietary+" - "+tickets[0].table+"\n")
                        if(!(guest.dietary === undefined))
                            message += "Table " + tickets[0].table + ": "+guest.name+" - " +guest.dietary+"\n";
                    }
                    else{
                        if(!(guest.dietary === undefined))
                            message += "Table not yet confirmed: "+guest.name+" - " +guest.dietary+"\n";
                    }
                    i++;
                    if(i < attendees.length){
                        recursiveForLoop(attendees)
                    }
                    else{
                        if(message ===""){
                            console.log("message empty")
                        }
                        else{
                            const auth = {
                                auth: {//key from mailgun.com
                                    api_key: 'key-5cdbf13ba24665be479fe7cef058d625',
                                    domain: 'mg.edwardiandoor.com'
                                }
                            };
                            let smtpTransport = nodemailer.createTransport(mg(auth));
                            smtpTransport.sendMail({
                                    from: 'Group Project <CS4098group5@gmail.com>',
                                    subject: 'Dietary Requirements',
                                    text: message,
                                    to: catererEmail
                                },
                                function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else{
                                        console.log("email sent to "+catererEmail)
                                        res.json({success:'true'})
                                    }

                            });
                        }
                    }
                });
            });
        });
    }
    recursiveForLoop(attendees)


});
module.exports = router;
