class Navigation extends PIXI.Container{
    constructor(){
        super();
        
        let fontSize = 30;
        
        let leftMargin = 10;
        let up = new PIXI.Text("!UP", { 
            fontFamily: 'Press Start 2P', 
            fontSize: fontSize, 
            fill: 0xFFFFFF,
            align: 'center' 
        });
        up.x = leftMargin;
        up.y = 570;
        super.addChild(up);

        let down = new PIXI.Text("!DOWN", { 
            fontFamily: 'Press Start 2P', 
            fontSize: fontSize, 
            fill: 0xFFFFFF, 
            align: 'center' 
        });
        down.x = leftMargin;
        down.y = 620;
        super.addChild(down);

        let select = new PIXI.Text("!SELECT", { 
            fontFamily: 'Press Start 2P', 
            fontSize: fontSize, 
            fill: 0xFFFFFF, 
            align: 'center' 
        });
        select.x = leftMargin;
        select.y = 670;
        super.addChild(select);
    }
}