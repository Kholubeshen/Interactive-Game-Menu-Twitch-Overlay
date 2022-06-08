WebFont.load({
    google: {
        families: ['Press Start 2P']
    },
    active: e => {
        console.log("font loaded!");
        // now start setting up your PixiJS (or canvas) stuff!
        let pixiApp = new PixiApp();
        // loadPixi();
    }
});