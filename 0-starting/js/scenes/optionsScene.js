class OptionsScene extends PIXI.Container{
    constructor(){
        super();

        //Options Title
        let optionsTitle = new PIXI.Text("OPTIONS", { 
            fontFamily: 'Press Start 2P',
            fontSize: 80,
            fill: 0xFFFFFF,
            align: 'center',
            dropShadow: 'true',
            dropShadowColor: '0x800080',
            dropShadowDistance: 7,
            fill: ['#FF0000', '#00FF00', '#0000FF'],
            fillGradientStops: [0.1, 0.7, 0.8],
            fillGradientType: 0
        });

        let year = new Year();
        super.addChild(year);

        let navigation = new Navigation();
        super.addChild(navigation);

        optionsTitle.x = (canvasWidth - optionsTitle.width) / 2;
        optionsTitle.y = 150;
        super.addChild(optionsTitle);
        this.options = new Options([`<< SONG-1 >>`, "BACK"], 40, whiteColor);
        this.options.y = 275;
        super.addChild(this.options);

    }

    setSong(currentSong){
        console.log(this.options.children[0]);
        console.log(currentSong);
        this.options.children[0].text = `<< SONG-${currentSong + 1} >>`
    }

    moveCursor(direction){
        this.options.moveCursor(direction);
    }

    getCursorPosition(){
        return this.options.cursorSprite.currentPos;
    }
}