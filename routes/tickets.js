const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Attendance = require('../models/attendance');

// Create new ticket
router.post('/add', (req, res, next) => {

    let amountOfTickets = parseInt(req.body.ticket_count);
    let amount = 0;

    Attendance.getAttendance(req.body.event_id, req.body.guest_id, (err, attendance) => {
        attendance.ticket_amount = attendance.ticket_amount + amountOfTickets;
        attendance.save();
    });
    let tickets = [];
    for (let index = 0; index < amountOfTickets; index++) {
        let newTicket = new Ticket({
            seat: req.body.seat,
            table: req.body.table,
            paid: false,
            dietary_preferences: req.body.dietary_preferences,
            extra_comments: req.body.extra_comments,
            event: req.body.event_id,
            bought_by: req.body.guest_id
        });
        Ticket.addTicket(newTicket, (err, ticket) => {
            if (err) {
                res.json({success: false, msg: 'Failed to create tickets'});
            } else {
                console.log("Ticket created " + amount);
                amount++;
                tickets.push(ticket);
                if (amount >= amountOfTickets) {
                    const auth = {
                        auth: {//key from mailgun.com
                            api_key: 'key-5cdbf13ba24665be479fe7cef058d625',
                            domain: 'mg.edwardiandoor.com'
                        }
                    };
                    let smtpTransport = nodemailer.createTransport(mg(auth));
                    let text = "Below are your tickets for " + req.body.event_name + "\n";
                    for (let i = 0; i < tickets.length; i++) {
                        let singleText = "Ticket " + (i+1) + "\n" +
                            "Ticket Code: " + tickets[i].ticket_code + "\n" +
                            "Dietary Requirements: " + tickets[i].dietary_preferences + "\n" +
                            "Seat Number: " + tickets[i].ticket_number + "\n" +
                            "Table: " + tickets[i].table + "\n\n";
                        text = text + singleText;
                    }
                    smtpTransport.sendMail({
                            from: 'Group Project <CS4098group5@gmail.com>',
                            subject: "Tickets for " + req.body.event_name,
                            text: text,
                            to: req.body.email
                        },
                        function (err) {
                            if (err) console.log(err)
                        });
                    res.json({success: true, msg: 'Tickets created!'});
                }
            }
        });
    }
});


router.post('/get', (req, res, next) => {
    let guest_id = req.body.guest_id;
    let event_id = req.body.event_id;

    Ticket.getTickets(guest_id, event_id, (err, tickets) => {
        if (err) {
            console.log("Error retrieving tickets.");
            res.json({success: false, msg: 'No tickets!'});
        } else {
            res.json({success: true, tickets: tickets});
        }
    });

});

module.exports = router;
