var app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);

// Create play button that can be used to trigger the video
var button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);

// Position the button
button.x = (app.screen.width - button.width) / 2;
button.y = (app.screen.height - button.height) / 2;
button.alpha = 0;

// Enable interactivity on the button
button.interactive = true;
button.buttonMode = true;
button.mouseover = function(mouseData){
    button.alpha = 1;
}
button.mouseout = function(mouseData){
    button.alpha = 0;
}

// Add to the stage
app.stage.addChild(button);

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', onPlayVideo);

function onPlayVideo() {

    // Don't need the button anymore
    button.destroy();

    // create a video texture from a path
    var texture = PIXI.Texture.fromVideo('assets/Main_Poster_Blobs.mp4');

    // create a new Sprite using the video texture (yes it's that easy)
    var videoSprite = new PIXI.Sprite(texture);

    // Stetch the fullscreen
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    app.stage.addChild(videoSprite);
}
