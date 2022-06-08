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

        let healthBar = new HealthBar(this.app);
        this.app.stage.addChild(healthBar);
    }
}