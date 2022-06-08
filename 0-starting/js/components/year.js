class Year extends PIXI.Container{
    constructor(){
        super();
        this.year = new PIXI.Text('© 2020', { fontFamily: 'Press Start 2P', fontSize: 30, fill: 0xFFFFFF, align: 'center' });
        this.year.x = 1090;
        this.year.y = 680;
        super.addChild(this.year); 
    }
}
