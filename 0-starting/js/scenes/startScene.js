class StartScene extends PIXI.Container{
    constructor(socket){
        super();
        this.title = new Title()
        super.addChild(this.title);
        
        this.socket = socket;
        
        let names = ["NEW", "LOAD", "OPTIONS", "EXIT"];
        this.options = new Options(names, 40, whiteColor);
        this.options.y = 350;
        super.addChild(this.options);

        let year = new Year();
        super.addChild(year);

        let navigation = new Navigation();
        super.addChild(navigation);
    }

    moveCursor(direction){
        this.options.moveCursor(direction)
    }

    getCursorPosition(){
        return this.options.cursorSprite.currentPos;
    }
}