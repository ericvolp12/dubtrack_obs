'use strict';
var app = require('express');
var router = app.Router();
var dubtrack = require('./modules/dubtrack');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/room/:roomID', function (req, res) {
    if (req.params.roomID) {
        dubtrack.getRoomNowPlaying(req.params.roomID).then(function(songName){
            setTimeout(dubtrack.getRoomNowPlaying.then(function(songName){
                app.io.emit('songName', {songName});
            }, function(err){
                app.io.emit('songName', {err});
            }), 3000);
            res.render('nowPlaying', {songName:songName});

        }, function(err){
            res.status(404).send(err);
        })
    } else {
        res.status(400).send("Please specify a room ID!");
    }
});



module.exports = router;
