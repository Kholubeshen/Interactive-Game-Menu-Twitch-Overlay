class Title extends PIXI.Container {
    
    constructor() {
        super();
        
        let YMod = 90;
        let headBanditOptions = {
            fontFamily: 'Press Start 2P',
            fontSize: 40,
            align: 'center',
            dropShadow: 'true',
            dropShadowColor: '#800080',
            dropShadowDistance: 5,
            fill: ['#FF0000', '#00FF00', '#0000FF'],
            fillGradientStops: [0.1, 0.7, 0.8],
            fillGradientType: 0
        }
    
        this.headBandit = new PIXI.Text('HeadBandit', headBanditOptions);
        this.headBandit.x = (canvasWidth - this.headBandit.width) / 2;
        this.headBandit.y = 105;
        super.addChild(this.headBandit);

        let killianOptions = {
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
        }

        this.killian = new PIXI.Text('KILLIAN', killianOptions);
        this.killian.x = (canvasWidth - this.killian.width) / 2;
        this.killian.y = 160;
        super.addChild(this.killian);
    }
}