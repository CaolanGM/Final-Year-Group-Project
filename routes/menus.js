var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require("path");
var fs = require('fs');

var DIR = './uploads/';
var uniqueTime = Date.now();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, uniqueTime + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage }).single('menu');
//var upload = multer({dest: DIR}).single('menu');

router.post("/upload",  function(req, res) {
    console.log("in upload route");
    if (!fs.existsSync(DIR)){
        fs.mkdirSync(DIR);
    }
    upload(req, res, function (error){
        uniqueTime = Date.now();
        if(error) {
            //res.status(400).send(error);
            res.json({success: false});

        }
        var filePath = '';
        filePath = req.file.path;
        res.json({success: true, msg: 'Menu uploaded', filePath: filePath});
    });
});

module.exports = router;