var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
var path = require('path');
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
