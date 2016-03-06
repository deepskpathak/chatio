var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var path = require('path');
var usernames = [];
//var io = require('../..')(server);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    console.log("Connected...");
});


// chat logic

io.sockets.on('connection', function (socket){

    // set user
    socket.on('new user', function(data, callback){
        if(usernames.indexOf(data) != -1){
            callback(false);
        }else {
            callback(true);
            socket.username = data;
            usernames.push(data);
            updateUsernames();
        }
    });

    function updateUsernames() {
        io.sockets.emit('usernames', usernames);
    }

    //disconnect user

    socket.on('disconnect', function (data) {
        if(!socket.username) return;
        usernames.splice(usernames.indexOf(socket.username));
    });

    //send message
    socket.on('send message', function (data){
        io.sockets.emit('new message', {msg : data, user: socket.username});
        console.log(data);
    });


});