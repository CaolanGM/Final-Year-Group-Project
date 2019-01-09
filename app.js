const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const nodemailer = require("nodemailer");
const multer = require ('multer');

const app = express();
// Connect to DB
mongoose.connect(config[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config[app.settings.env]);
    }
});

const users = require('./routes/users');
const guests = require('./routes/guests');
const events = require('./routes/events');
const tickets = require('./routes/tickets');
const attendances = require('./routes/attendances');
const menus = require('./routes/menus');


// Port
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/guests', guests);
app.use('/api/tickets', tickets);
app.use('/api/events', events);
app.use('/api/attendances', attendances);
app.use('/api/menus', menus);

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Index Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('App listening at http://localhost:%s', port);
});

module.exports = server;