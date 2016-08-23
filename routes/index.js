var express = require('express');
var router = express.Router();
var dubtrack = reqiure('./modules/dubtrack');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/room/:roomID', function (req, res) {
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
