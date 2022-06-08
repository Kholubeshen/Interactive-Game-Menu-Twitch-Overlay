const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port);
const socket = require('socket.io');
const io = socket(server);
const Chatbot = require("./chatbot/chatbot");
const fs = require('fs');
let turnOffDisplay = require("turn-off-display");
const displayRotationWindows = require('display-rotation-windows');
var bodyParser = require('body-parser')
let chatbot = new Chatbot(io);
 
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => { 
    res.send(console.log("Hello! Please enter a correct address."));
});
app.get('/starting', (req, res) => {
    res.sendFile('T:\\TwitchStream\\Interactive Game Menu Twitch Overlay\\0-starting\\index.html');
});
app.get('/overlay', (req, res) => {
    let address = 'T:\\TwitchStream\\Interactive Game Menu Twitch Overlay\\1-overlay\\index.html'
    res.sendFile(address);
});
app.get('/ending', (req, res) => {
    res.sendFile('T:\\TwitchStream\\Interactive Game Menu Twitch Overlay\\1-ending\\index.html')
});
app.get('/events', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(["Blind", "Dizzy", "Heal", "Attack"]);
})
app.post('/events/redeem', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("RequestBody", req.body.redemption);
    switch(req.body.redemption){
        case "Blind":
            res.send(blind());
            break;
        case "Dizzy":
            res.send(dizzy());
    }
})

app.use(express.static("T:\\TwitchStream\\Interactive Game Menu Twitch Overlay\\"));

io.set("transports", ["websocket"]);
io.sockets.on('connection', (socket) => newConnection(socket));

function newConnection(socket){
    socket.on("insertCoin", () => {
        socket.broadcast.emit("insertCoin");
    });
    socket.on("select", (inputType) => {
        socket.broadcast.emit('select', inputType);
    });
    socket.on("moveCursor", (direction) => {
        socket.broadcast.emit("moveCursor", direction);
    })
}

function blind(){
    try {
        turnOffDisplay();
    }
    catch (err) {

        console.log(err);
        // handle error
        return err;

    }
    return "Success";
}

function dizzy(){
    displayRotationWindows.rotate180();
    setTimeout(() => {
        displayRotationWindows.rotate180();
    }, 10000)
    return "Success";
}