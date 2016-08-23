# dubtrack_obs
A simple site to host Dubtrack current songs for OBS using the BrowserPlugin

Getting it to work is simple, though you'll have to refactor some bits cause you don't own my domains....

Clone it.

`npm install` it

`npm start` it

Visit it at `localhost:3005`

Route `/room/{roomID}` will bring up the current song in the room with that ID on Dubtrack.fm

This simple web service was built so that streamers can use the OBS Studio BrowserPlugin to create a media source for the title of their currently playing song without having to use a screen capture or a browser capture on the tiny part of their screen where the song is showing in their web browser.
