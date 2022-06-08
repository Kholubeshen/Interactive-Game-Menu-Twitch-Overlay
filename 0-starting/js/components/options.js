class Options extends PIXI.Container{
    constructor(names, fontSize, fill){
        super();

        this.space = 30;
        this.optionsArr = [];
        this.cursorXOffset = 50;

        names.forEach(name => {            
            this.createTextOption(name, fontSize, fill);
        });

        this.createCursor();

        this.blinkCursor();
    }

    blinkCursor(){
        setInterval(() => {
            this.cursorSprite.visible = !this.cursorSprite.visible;
        }, 500);
    }

    createTextOption(name, fontSize, fill){
        let numOptions = this.optionsArr.length;
        let tempText = new PIXI.Text(
            name, 
            {
                fontFamily: 'Press Start 2P',
                fontSize:fontSize,
                fill:fill,
                align:'center'
            }
        );
        tempText.x = (canvasWidth - tempText.width) / 2;
        tempText.y = numOptions * (tempText.height + this.space);

        this.addChild(tempText);
        this.optionsArr.push(tempText);
    }

    createCursor() {
        let cursorTexture = PIXI.Texture.from('./0-starting/assets/images/cursor.png');
        this.cursorSprite = new PIXI.Sprite(cursorTexture);
        this.cursorSprite.x = this.optionsArr[0].x - this.cursorXOffset;
        this.cursorSprite.y = this.optionsArr[0].y;
        this.cursorSprite.tint = 0x800080;
        this.cursorSprite.currentPos = 0;
        this.addChild(this.cursorSprite);
    }

    moveCursor(direction) {
        let pos = this.cursorSprite.currentPos;
        const moveSound = PIXI.sound.Sound.from({url:'./0-starting/assets/audio/select.wav', volume:.5});
        moveSound.play();
        this.cursorSprite.visible = true;
        if (direction == "down") {
            this.setCursorPosition(this.cursorSprite, pos + 1);
        } else {
            this.setCursorPosition(this.cursorSprite, pos - 1);
        }
    }

    getOptionsArr(){
        return this.optionsArr;
    }

    setCursorPosition(cursorSprite, newPos) {
        if (newPos == -1) {
            newPos = this.optionsArr.length - 1;
        }
        if (newPos == this.optionsArr.length) {
            newPos = 0;
        }
        this.cursorSprite.currentPos = newPos;
        cursorSprite.x = this.optionsArr[newPos].x - this.cursorXOffset;
        cursorSprite.y = this.optionsArr[newPos].y;
    }
}