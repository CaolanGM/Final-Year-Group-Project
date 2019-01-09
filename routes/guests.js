const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Guest = require('../models/guest');


router.get('/guest', passport.authenticate('jwt', {session: false}), function (req, res) {
    Guest.find({})
        .exec(function (err, guests) {
            if (err) {
                console.log("Error retrieving guests");
            }
            else {
                res.json({gList: guests});
            }
        });
});


router.get('/test', passport.authenticate('jwt', {session: false}), function (req, res) {
    Guest.getRegularGuests(list => {
        res.json(list);
    });
});


router.get('/regulars', passport.authenticate('jwt', {session: false}), function (req, res) {
    Guest.find().sort([['eventsAttended', 'descending']])
        .exec(function (err, guests) {
            if (err) {
                console.log("Error retrieving guests");
            }
            else {
                res.json({gList: guests});
            }
        });
});


router.get('/bigspenders', passport.authenticate('jwt', {session: false}), function (req, res) {
    Guest.find().sort([['donationTotal', 'descending']])
        .exec(function (err, guests) {
            if (err) {
                console.log("Error retrieving guests");
            }
            else {
                res.json({gList: guests});
            }
        });
});


router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  console.log("TESTING!!!!!!!");
    let newGuest = new Guest({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        donationTotal: req.body.donationTotal,
        eventsAttended: req.body.eventsAttended,
        dietary: req.body.dietary
    });
    Guest.addGuest(newGuest, function (err, insertedGuest) {
        if (err) {
            console.log(err);
        }
        else {
            //res.json(insertedGuest);
            res.json({success: true, msg: 'Guest registered', guest: newGuest});
        }
    });
});

router.get('/getById/:id', passport.authenticate('jwt', {session: false}), function(req, res){
    let guestId = req.params.id;
    Guest.getGuestById(guestId, (err, guest) => {
        res.json({guest: guest});
    });
});

router.post('/add/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let id = req.params.id;
    let updates = req.body;
    Guest.findByIdAndUpdate(id, updates, (err, insertedGuest) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                success: true,
                guest: insertedGuest
            });
        }
    });
});


router.post('/donation/:id/:amount', (req, res, next) => {
    const id = req.params.id;
    const amount = req.params.amount;
    Guest.getGuestById(id, (err, guest) => {
        if (err) throw err;
        if (!guest) {
            return res.json({success: false, msg: 'User not found'});
        }

        Guest.updateDonation(attendee,amount, (err, guest) => {
            if (err) {
                res.json({success: false, msg: 'Failed to update user ' + err});
            } else {
                res.json({
                    success: true,
                    msg: 'Guest updated',

                });
            }
        });


      });
});


module.exports = router;
