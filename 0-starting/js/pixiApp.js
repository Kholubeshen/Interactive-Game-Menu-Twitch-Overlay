class PixiApp {
    constructor() {
        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }
        
        //Notifies that pixi is working
        PIXI.utils.sayHello(type);
        
        //Create a Pixi Application
        this.app = new PIXI.Application({ width: canvasWidth, height: canvasHeight, transparent: true});
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.app.view);

        //Connects to socket
        this.socket = io.connect("http://localhost:3000", {
            upgrade: false,
            transports:['websocket']
        });

        this.musicURLs = [
            "../0-starting/assets/audio/rolemusiTheWhite.mp3",
            '../0-starting/assets/audio/A_Bit_Of_Hope-David_Fesliyan.mp3'
        ]

        this.currentSong = 0;
        this.playMusic(this.currentSong);
        this.initScenes();

        this.socket.on('select', (inputType) => this.onSelectMessageHandler(inputType));
        this.socket.on('moveCursor', (direction) => this.currentScene.moveCursor(direction));

        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    initScenes(){
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, 1280, 720);
        this.app.stage.addChild(this.background);
    
        this.insertCoinsScene = new InsertCoins(this.socket);
        this.insertCoinsScene.visible = true;
        this.app.stage.addChild(this.insertCoinsScene);

        this.startScene = new StartScene(this.socket);
        this.startScene.visible = false;
        this.app.stage.addChild(this.startScene);
    
        this.loadScene = new LoadScene(this.socket);
        this.loadScene.visible = false;
        this.app.stage.addChild(this.loadScene);

        this.optionsScene = new OptionsScene(this.socket);
        this.optionsScene.visible = false;
        this.app.stage.addChild(this.optionsScene);

        this.exitScene = new ExitScene(this.socket);
        this.exitScene.visible = false;
        this.app.stage.addChild(this.exitScene);

        this.currentScene = this.insertCoinsScene;

        this.scenes = {
            start:this.startScene, 
            insertCoins:this.insertCoinsScene,
            // new:"new",
            load:this.loadScene,
            options:this.optionsScene,
            exit:this.exitScene
        }
    }

    playMusic(index){
        this.introMusic = PIXI.sound.Sound.from({url:this.musicURLs[index], volume:.03, loop:true});
        this.introMusic.play();
    }
    
    changeSong(){
        this.introMusic.stop();

        let nextSong = this.currentSong + 1;
        if(nextSong > this.musicURLs.length - 1){
            nextSong = 0;   
        }
        this.optionsScene.setSong(nextSong);
        this.currentSong = nextSong;
        this.playMusic(nextSong);
    }

    onSelectMessageHandler(inputType){
            this.chooseNextScene(inputType);
    }

    onKeyDown(key) {
        if(key.keyCode == 13){
            console.log()
            this.socket.emit("select", 'key');
            this.chooseNextScene("key");

        } else if(key.keyCode === 38 || key.keyCode === 87){
                //Move cursor up.
                this.currentScene.moveCursor("up");
                this.socket.emit("moveCursor", "up");
        } else if(key.keyCode === 40 ||  key.keyCode == 83){
                //Move cursor down.
                this.currentScene.moveCursor("down");
                this.socket.emit("moveCursor", "down");
        }        
    }

    // changeOptionsSceneSettings(){
    //     switch(this.optionsScene.getCursorPosition()){
    //         case 0:
    //             this.changeSong();
    //             break;
    //         default:
    //             this.chooseNextScene();
    //     }
    // }

    chooseNextScene(inputType){
        let enterSound = PIXI.sound.Sound.from({url:'../0-starting/assets/audio/enter.wav', volume:.05});
        switch(this.currentScene){
            case this.insertCoinsScene:
                if(this.insertCoinsScene.credits >= 3){
                    this.currentScene.visible = false;
                    enterSound.play();
                    this.startScene.visible = true;
                    this.currentScene = this.startScene;
                }
                break;
            case this.startScene:
                switch(this.startScene.getCursorPosition()){
                    case 0:
                        //new
                        break;
                    case 1:
                        enterSound.play();
                        this.currentScene.visible = false;
                        this.loadScene.visible = true;
                        this.currentScene = this.loadScene;
                        break;
                    case 2:
                        enterSound.play();
                        this.currentScene.visible = false;
                        this.optionsScene.visible = true;
                        this.currentScene = this.optionsScene;
                        break;
                    case 3:
                        enterSound.play();
                        this.currentScene.visible = false;
                        this.exitScene.visible = true;
                        this.currentScene = this.exitScene;
                        break;
                }
                break;
                
            case this.loadScene:
                console.log(this.loadScene.options.cursorSprite.currentPos, this.loadScene.options.optionsArr.length);
                if(this.loadScene.options.cursorSprite.currentPos == this.loadScene.options.optionsArr.length - 1){
                    enterSound.play();
                    this.currentScene.visible = false;
                    this.startScene.visible = true;
                    this.currentScene = this.startScene;
                } else {
                    if(inputType == "key"){
                        enterSound.play();
                        this.currentScene.visible = false;
                        this.background.visible = false;
                        let intervalID = setInterval(()=> {
                            this.introMusic.volume -= .0005;
                            if(this.introMusic.volume <= 0){
                                this.introMusic.stop;
                                clearInterval(intervalID);
                            }
                        },50);
                    } 
                }
                break;
            case this.optionsScene:
                switch(this.optionsScene.getCursorPosition()){
                    case 0:
                        this.changeSong();
                        break;
                    default:
                        this.currentScene.visible = false;
                        this.startScene.visible = true;
                        this.currentScene = this.startScene;
                }
                break;
            case this.exitScene:
                this.currentScene.visible = false;
                this.startScene.visible = true;
                this.currentScene = this.startScene;
                break;
       } 
    }
    setScene(scene){
        this.app.stage.removeChild(this.currentScene);
        this.app.stage.addChild(scene);
    }
}


