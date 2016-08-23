'use strict';
var app = require('express');
var router = app.Router();
var dubtrack = require('./modules/dubtrack');
var rooms = {};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/room/:roomID', function (req, res) {
    var io = req.app.get('socketio');
    io.on('connection', function(socket) {
        if(rooms[req.params.roomID]){
            if(rooms[req.params.roomID].sockets){
                rooms[req.params.roomID].sockets.push(socket);
            }else{
                rooms[req.params.roomID].sockets = [];
                rooms[req.params.roomID].sockets.push(socket);
            }
        }
    });

    if (req.params.roomID) {
        if(rooms[req.params.roomID]){
            res.render('nowPlaying', {songName:rooms[req.params.roomID].songName});
        }else {
            dubtrack.getRoomNowPlaying(req.params.roomID).then(function (songName) {
                rooms[req.params.roomID] = {
                    songName:songName
                };
                res.render('nowPlaying', {songName: songName});
            }, function (err) {
                rooms[req.params.roomID] = {
                    songName:err
                };
                res.status(404).send(err);
            })
        }
    } else {
        res.status(400).send("Please specify a room ID!");
    }
});

function fetchStuff(){
    for (let roomID in rooms) {
        // skip loop if the property is from prototype
        if (!rooms.hasOwnProperty(roomID)) continue;
        let room = rooms[roomID];
        dubtrack.getRoomNowPlaying(roomID).then(function(songName) {
            if(room.songName !== songName){
                console.log("Song has changed for room: ", roomID);
                room.songName = songName;
                for(let i = 0; i < sockets.length; ++i) {
                    sockets[i].emit('songName', songName);
                }
            }
        }, function (err) {
            room.songName = songName;
            for(let i = 0; i < sockets.length; ++i) {
                sockets[i].emit('songName', err);
            }
        });
    }
}
setInterval(fetchStuff, 5000);





module.exports = router;
