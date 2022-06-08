class InsertCoins extends PIXI.Container{
    constructor(socket) {
        super();

        this.credits = 0;

        this.title = new Title()
        super.addChild(this.title);

        let insertCoinsText = new PIXI.Text('!INSERTCOIN', { 
            fontFamily: 'Press Start 2P', 
            fontSize: 30, 
            fill: 0xFFFFFF, 
            align: 'center' 
        });
        insertCoinsText.x = canvasWidth - insertCoinsText.width - 10;
        insertCoinsText.y = 10;
        super.addChild(insertCoinsText);
    
        let startingSoonText = new PIXI.Text('STARTING SOON', {
            fontFamily: 'Press Start 2P', 
            fontSize: 40, 
            fill: 0xFFFFFF, 
            align: 'center' 
        });
        startingSoonText.x = (canvasWidth - startingSoonText.width)/2;
        startingSoonText.y = 330;
        super.addChild(startingSoonText);

        setInterval(() => {            
            insertCoinsText.visible = !insertCoinsText.visible;
        }, 750)



        this.creditsText = new PIXI.Text(`CREDITS ${this.credits}/3`, {
            fontFamily: 'Press Start 2P',
            fontSize: 30,
            fill: 0xFFFFFF,
            align: 'center'
        });
        this.creditsText.x = canvasWidth - this.creditsText.width - 10;
        this.creditsText.y = insertCoinsText.height + 15;
        super.addChild(this.creditsText);
    
        this.startText = new PIXI.Text('PRESS !START', {
            fontFamily: 'Press Start 2P',
            fontSize: 40,
            fill: 0xFFFFFF,
            align: 'center'
        })
        this.startText.x = canvasWidth/2 - this.startText.width/2;
        this.startText.y = canvasHeight/2 - this.startText.height/2 + 40;
        this.startText.visible = false;
        super.addChild(this.startText);

        let year = new Year();
        super.addChild(year);

        this.socket = socket;

        // this.socket = io.connect("http://localhost:3000", {
        //     upgrade: false,
        //     transports:['websocket']
        // });
        this.socket.on("insertCoin", (e) => this.insertCoin(e));

        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    onKeyDown(key) {
        if(key.keyCode == 73){
            this.insertCoin();
            this.socket.emit("insertCoin", '');
        }
    }

    blinkStart(){
        this.startText.visible = true;
        setInterval(() => {            
            this.startText.visible = !this.startText.visible;
        }, 750)
    }

    insertCoin(){
        // console.log(this);
        this.credits++;
        this.creditsText.text = `CREDITS ${this.credits}/3`;
        if(this.credits == 3){
            this.blinkStart();
        }
        const insertCoinSound = PIXI.sound.Sound.from({url:'../0-starting/assets/audio/insertSound.wav', volume:.5});
        insertCoinSound.play();
    }
}
