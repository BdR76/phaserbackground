// -------------------------------------
// Define background effect and fade effect
// as global functions so that they
// can be used in both states Screen1 and Screen2 
// -------------------------------------
var STAR_LAYERS = 10;
var STARS_PER_LAYER = 12;

function createStars(pGame, pGrp) {
	// black background
	pGame.stage.backgroundColor = 0x000000;

	// create star layers
	for (var i = 0; i < STAR_LAYERS; i++) {
		pGrp[i] = pGame.add.group();
		var scale = (i+1) / (STAR_LAYERS+1);
		//console.log('createStars - test scale='+scale);
		// add s stars to each group
		for (var s = 0; s < STARS_PER_LAYER; s++) {
			// random position
			var x = pGame.rnd.integerInRange(0, SCREEN_WIDTH-32);
			var y = pGame.rnd.integerInRange(-64, SCREEN_HEIGHT);

			// create sprite and scale
			var newobj = pGame.add.sprite(x, y, 'staralpha');
			newobj.scale.x = scale;
			newobj.scale.y = scale;
			//newobj.health = scale; // for moving

			pGrp[i].add(newobj);
		};
	};
}

function updateStars(pGame, pGrp) {
	// update all star layers
	for (var i = 0; i < STAR_LAYERS; i++) {
		var speed = (i+1) / (STAR_LAYERS+1);
		//console.log('backgroundObjsUpdate - test scale='+scale);
		// scroll all stars vertically up
		for (var s = 0; s < STARS_PER_LAYER; s++) {
			// stars move faster in forground than in background layer
			pGrp[i].children[s].y -= speed * 2; // *2 = all stars move faster

			// reset stars when they reach top of screen
			if (pGrp[i].children[s].y < -64) {
				// random x position
				pGrp[i].children[s].x = pGame.rnd.integerInRange(0, SCREEN_WIDTH-32);
				pGrp[i].children[s].y = SCREEN_HEIGHT;
			};
		};
	};
}

function doFadeIn(pGame, bFadeIn) {
    // fade in or out
    var alphaFrom = 0.0;
    var alphaGoal = 1.0;
    if (bFadeIn==true) {
        alphaFrom = 1.0;
        alphaGoal = 0.0;
    }
    // set black box
    var blackbox = pGame.add.graphics(0, 0);
    blackbox.beginFill(0x000000, 1.0);
    blackbox.drawRect(0, 0, 800, 600);
	blackbox.alpha = alphaFrom;
    // tween alpha to fade in or out
    var tw = pGame.add.tween(blackbox);
    tw.to( { alpha: alphaGoal}, 1000, Phaser.Easing.Linear.None, true);
	// remove graphics after fade complete
    //tw.onComplete.add(function () {
	//	blackbox.destroy();
	//});
    return tw;
}