'use strict';
var app = require('express');
var router = app.Router();
var dubtrack = require('./modules/dubtrack');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/room/:roomID', function (req, res) {
    var io = req.app.get('socketio');
    io.on('connection', function(socket) {
        function fetchStuff(){
            dubtrack.getRoomNowPlaying(req.params.roomID).then(function (songName) {
                socket.emit('songName', songName);
            }, function (err) {
                socket.emit('songName', err);
            });
        }
        setInterval(fetchStuff, 3000)
    });

    if (req.params.roomID) {
        dubtrack.getRoomNowPlaying(req.params.roomID).then(function(songName){
            res.render('nowPlaying', {songName:songName});

        }, function(err){
            res.status(404).send(err);
        })
    } else {
        res.status(400).send("Please specify a room ID!");
    }


});





module.exports = router;
