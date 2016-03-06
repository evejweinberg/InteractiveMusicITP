//make a droplet..use that IP address for the next step
//ajax, digital ocean stuff
//sftp to sign in



//FILE ON THE SERVER, NOT CONNECTED TO THE INDEX FILE

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs')

app.listen(3000);
//STEP 1: Open index.html for any client on port 3000..right now it's localhost 3000
function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}
//STEP 3: as soon as a new connection happens...
io.on('connection', function(socket) {
    //server is sending to every connected clients, on connect
    ////step 2)called news, data is 'world'
    socket.emit('news', { yo: 'whatever', name: "eve", "age": 24 });


    //step5) 'on recieving'
    //client has sent an event called 'my other event', and data is the data along with it..json or whatever
    socket.on('my other event', function(data) {
        console.log(data);
    });
});



//when i recieve the message, play this tone.
//
