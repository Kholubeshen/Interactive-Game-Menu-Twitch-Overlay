class HealthBar extends PIXI.Container {
    constructor(app){
        super(app);

        let innerHealthGraphic = new PIXI.Graphics();
        innerHealthGraphic.beginFill(0xFF0000);
        let rectX = 0;
        let rectY = 0;
        let rectWidth = 300;
        let rectHeight = 35;
        let rectRadius = 10
        innerHealthGraphic.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, rectRadius);

        let texture = app.renderer.generateTexture(innerHealthGraphic);
        let innerHealth = new PIXI.Sprite(texture);
        this.addChild(innerHealth);

        this.healthMask = new PIXI.Graphics();
        this.healthMask.beginFill();
        this.healthMask.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, rectRadius);
        this.healthMask.endFill();
        this.addChild(this.healthMask);

        this.healthBoundary = PIXI.Graphics();
        this.healthBoundary.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, rectRadius);

        innerHealth.mask = this.healthMask;

        // this.moveMask();
    }

    increaseHealth(amount){
        this.healthMask.x += amount;
    }

    decraseHealth(amount){
        this.healthMask -= amount;
    }
}