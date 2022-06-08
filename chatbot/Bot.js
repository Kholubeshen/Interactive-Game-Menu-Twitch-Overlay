const tmi = require('tmi.js');
const robot = require('robotjs');
const fs = require('fs');
const d20 = require('./D20');
// ONLY CHANGE THINGS WITH ***

// ***Change to your bot's name.
let botUsername = "banditassistant"

// ***Set to your bot's OAUTH key. Get it from here: https://twitchapps.com/tmi/ (Make sure you are logged in with the bot account.)
let oauthKey = "wkxcj1anf9q3dkcb5f6mgngpb0ww2g"

// ***Channel you want your bot to run on ("Blootrix").
let mainChannel = "headbanditkillian"

// Define configuration options
const opts = {
    identity: {
        username: botUsername, 
        password: oauthKey 
    },
    channels: [
        mainChannel
    ]
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// robot.keyTap("f20");

// Called every time a message comes in
// msg is chat message
function onMessageHandler(channel, context, msg, self) {
    console.log("Robot", robot);

    if (self) { return; } // Ignore messages from the bot
    client.say(self, msg);
    // Remove whitespace from chat message
    const commandName = msg.trim().toLowerCase();
    switch(commandName){
        case "!commands":
            client.say(channel, "!confetti, !msg, !disco, !lol, !lasers, !snow");
            break;
        case "!lol":
        case "!haha":
        case "!laugh":
            console.log("Laugh Sent");
            fs.writeFile('Hotkeys.txt', 'laugh', function (err) {
                if (err) throw err;
                robot.keyTap('f20');
            });
            break;
        case "!d20":
            d20(channel, context, client);
            break;
        case "!msg":
            console.log("Msg received.")
            fs.writeFile('Hotkeys.txt', 'msg', function (err) {
                if (err) throw err;
                robot.keyTap('f20');
            });
            break;
        case "!confetti":
            console.log("Confetti");
            fs.writeFile('Hotkeys.txt', 'confetti', function (err){
                if (err) throw err;
                robot.keyTap('f20');
            })
            break;
        case "!bday":
            console.log("Bday!");
            fs.writeFile('Hotkeys.txt', 'bday', function (err){
                if (err) throw err;
                robot.keyTap('f20');
            })
            break;
        case "!snow":
            console.log("Its Snowing!");
            fs.writeFile('Hotkeys.txt', 'snow', function (err){
                if (err) throw err;
                robot.keyTap('f20');
            })
            break;
        case "!lasers":
            console.log("Laser Lights!");
            fs.writeFile('Hotkeys.txt', 'laser', function (err){
                if (err) throw err;
                robot.keyTap('f20');
            })
            break;
        case "!disco":
            console.log("Stayin' alive!");
            fs.writeFile('Hotkeys.txt', 'disco', function (err){
                if (err) throw err;
                robot.keyTap('f20');
            })
            break;
        case "!insertcoin":
            console.log("Insert Coin!");
            io.socket.broadcast("insertCoin", '');
            break;
        default:
            console.log(`* Unknown command ${commandName}`);
            break;
    }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    console.log("Chatbot is running.")
    console.log("If you close this, the chatbot will stop running.");
}