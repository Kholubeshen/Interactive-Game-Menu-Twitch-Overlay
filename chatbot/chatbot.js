class Chatbot{
    constructor(io){
        const tmi = require('tmi.js');
        this.robot = require('robotjs');
        this.fs = require('fs');
        const d20 = require('./D20');
        this.io = io;
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

        this.robot.setKeyboardDelay(50);

        // Create a this.client with our options
        this.client = new tmi.client(opts);

        // Register our event handlers (defined below)
        this.client.on('message', (channel, context, msg, self) => this.onMessageHandler(channel, context, msg, self));
        this.client.on('connected', (addr, port) => this.onConnectedHandler(addr, port));

        // Connect to Twitch:
        this.client.connect();
    }

    onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
        console.log("Chatbot is running.")
        console.log("If you close this, the chatbot will stop running.");
    }

    onMessageHandler(channel, context, msg, self) {
        if (self) { return; } // Ignore messages from the bot
        this.client.say(self, msg);
        // Remove whitespace from chat message
        const message = msg.trim().toLowerCase();
        console.log("Message", message);

        let splitMessages =  message.split(" ");
        

        
        let commandName = splitMessages[0];
        let postCommand = splitMessages[1];


        switch(commandName){
            case "!commands":
                this.client.say(channel, "!confetti, !msg, !disco, !lol, !lasers, !snow");
                break;
            case "!lol":
            case "!haha":
            case "!laugh":
                console.log("Laugh Sent");
                this.fs.writeFile('Hotkeys.txt', 'laugh', (err) => {
                    if (err) throw err;
                    this.robot.keyTap('f20');
                });
                break;
            case "!d20":
                // d20(channel, context, this.client);
                break;
            case "!msg":
                console.log("Msg received.")
                this.fs.writeFile('Hotkeys.txt', 'msg', (err) => {
                    if (err) throw err;
                    this.robot.keyTap('f20');
                });
                break;
            case "!confetti":
                console.log("Confetti");
                this.fs.writeFile('Hotkeys.txt', 'confetti', (err) =>{
                    if (err) throw err;
                    this.robot.keyTap('f20');
                })
                break;
            case "!bday":
                console.log("Bday!");
                this.fs.writeFile('Hotkeys.txt', 'bday', (err) =>{
                    if (err) throw err;
                    this.robot.keyTap('f20');
                })
                break;
            case "!snow":
                console.log("Its Snowing!");
                this.fs.writeFile('Hotkeys.txt', 'snow', (err) =>{
                    if (err) throw err;
                    console.log("robot", this.robot);
                    this.robot.keyTap('f20');

                })
                break;
            case "!lasers":
                console.log("Laser Lights!");
                this.fs.writeFile('Hotkeys.txt', 'laser', (err) =>{
                    if (err) throw err;
                    this.robot.keyTap('f20');
                })
                break;
            case "!disco":
                console.log("Stayin' alive!");
                this.fs.writeFile('Hotkeys.txt', 'disco', (err) =>{
                    if (err) throw err;
                    this.robot.keyTap('f20');
                })
                break;
            case "!insertcoin":
                console.log("Insert Coin Sent");
                this.io.sockets.emit("insertCoin", '');
                break;
            case "!start":
                console.log("Select Sent");
                this.io.sockets.emit("select", 'command');
                break;
            case "!up":
                console.log("Up Sent");
                this.io.sockets.emit("moveCursor", "up");
                break;
            case "!down":
                console.log("Down Sent");
                this.io.sockets.emit("moveCursor", "down");
                break;
            case "!select":
                console.log("Select Sent");
                this.io.sockets.emit("select");
                break;
            case "!vote":
                console.log(`Vote: ${postCommand} UserName: ${context.username}`);
                this.io.sockets.emit("vote", {voteNo: postCommand, username:context.username});
                break;
            default:
                console.log(`* Unknown command ${commandName}`);
                break;
        }
    }
}

module.exports = Chatbot;