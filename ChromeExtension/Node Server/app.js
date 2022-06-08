const express = require('express')
const app = express()
const port = 3000
const http = require('http');
// Socket connection

/* Creates new HTTP server for socket */
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

/* Listen for socket connection on port 3002 */
socketServer.listen(3002, function () {
    console.log('Socket server listening on : 3002');
});

/* This event will emit when client connects to the socket server */
io.on('connection', function (socket) {
    console.log('Socket connection established');
    
    // Sends message to clients.
    io.emit('chat message', "Hello Client");
    socket.on('message', function(data){
        console.log("Client said: " + data);
    })
});



/* Create HTTP server for node application */
var server = http.createServer(app);

/* Node application will be running on 3000 port */
server.listen(port);

