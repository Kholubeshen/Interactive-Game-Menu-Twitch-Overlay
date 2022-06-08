class ExitScene extends PIXI.Container {
    constructor(socket){
        super();
        
        this.socket = socket;

        let areYouSure = new PIXI.Text("Are you sure you want to quit?", { 
            fontFamily: 'Press Start 2P', 
            fontSize: 40, 
            fill: 0xFFFFFF, 
            align: 'center' 
        });
        areYouSure.x = (canvasWidth - areYouSure.width) / 2;
        areYouSure.y = 350;
        super.addChild(areYouSure);

        let year = new Year();
        super.addChild(year);

        let navigation = new Navigation();
        super.addChild(navigation);

        this.options = new ExitOptions(["NO", "YES"], 40, whiteColor);
        this.options.y = 420;
        super.addChild(this.options);
    }

    moveCursor(direction){
        this.options.moveCursor(direction)
    }
}