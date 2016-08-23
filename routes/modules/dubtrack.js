'use strict';
/**
 * Created by Eric Volpert on 8/23/2016.
 */
var https = require("https");
let apiBASE = "https://api.dubtrack.fm";

function getRoomNowPlaying(roomID) {
    return new Promise(function (resolve, reject) {
        let apiPATH = "/room/";
        apiPATH += roomID;
        https.get(apiBASE + apiPATH, function (res) {
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
               var apiResponse = JSON.parse(body);
                apiResponse = apiResponse.data;
                if(apiResponse.currentSong) {
                    console.log("Got response from Dubtrack API, currently playing song is: " + apiResponse.currentSong.name + " in room: " + roomID);
                    resolve(apiResponse.currentSong.name);
                }else{
                    console.log("No current song found for room: " + roomID);
                    console.log("API response: ", apiResponse);
                    reject("No current song found for room: " + roomID);
                }
            });

        });
    });
}


module.exports = {
    getRoomNowPlaying: getRoomNowPlaying
};