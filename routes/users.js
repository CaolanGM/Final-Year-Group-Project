const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Event = require('../models/event');
const Attendance = require('../models/attendance');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
// Register
router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
  
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

//send mass email
router.post('/email', (req, res, next) => {
    console.log("data received, will send to " + req.body.mailingList + " mailing list");
//    res.json({success: true, msg: 'Data received for email'});
    const auth = {
        auth: {//key from mailgun.com
            api_key: 'key-5cdbf13ba24665be479fe7cef058d625',
            domain: 'mg.edwardiandoor.com'
        }
    };
    let smtpTransport = nodemailer.createTransport(mg(auth));
    Event.getEventByName(req.body.mailingList, (err, event) => {
        if (err) {
            console.log(err)
        }
        else {
            let eventDescription = event.description;
            Attendance.getAttendanceByEvent(event._id, (err, attendances) => {
                if (err) {
                    console.log(err);
                }
                else {
                    for (let i = 0; i < attendances.length; i++) {
                        //find "<USERNAME>"" in html template and replace with username
                        let text = req.body.body;
                        text = text.replace("<USERNAME>", attendances[i].guest.name);
                        text = text.replace("<EVENTDESCRIPTION>", eventDescription);
                        smtpTransport.sendMail({
                                from: 'Group Project <CS4098group5@gmail.com>',
                                subject: req.body.subject,
                                text: text,
                                to: attendances[i].guest.email
                            },
                            function (err) {
                                if (err) console.log(err)
                            });
                    }
                    console.log("sent email to everyone in database")

                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({payload: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Authenticate old password
router.get('/authenticate_pass', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
    if (!user) {
        return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
    if (isMatch) {
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } else {
        return res.json({success: false, msg: 'Wrong password'});
    }
    });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

router.post('/profile/edit', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newUser = User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    let oldUser = req.user;
    User.updateUser(oldUser, newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update user ' + err});
        } else {
            res.json({
                success: true,
                msg: 'User updated',
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        }
    });
});

module.exports = router;
