var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

// -------------------------------------
// define the game state screen1
// -------------------------------------
var mygame = {};
mygame.Screen1 = function(game){
	this.game = game;
};
mygame.Screen1.prototype = {
	preload: function() {
		console.log('Screen1.preload was called..');
		this.game.load.image('staralpha', 'staralpha.png');
	},
	create: function() {
		// black background
		game.stage.backgroundColor = 0x000000;
	
		// initialise background star effect
		this.stars = [];
		createStars(this.game, this.stars);

		// add text
		var x = this.game.rnd.integerInRange(0, 500);
		var y = this.game.rnd.integerInRange(0, 400);
		var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
		var text = this.game.add.text(x, y, "Screen1\nTap for screen2.", style);
		// tap input handler
		this.game.input.onDown.add(this.doTap, this);
		// -- FADE IN --
		console.log('Screen1.create -- start fade in..');
		doFadeIn(this.game, true);
	},
	update: function() {
		console.log('Screen1.update is running..');
		updateStars(this.game, this.stars);
	},
	doTap: function(){
		// -- FADE OUT --
		console.log('Screen1.doTap -- start fade out..');
		var t = doFadeIn(this.game, false);
		t.onComplete.add(this.switchToScreen2, this);
	},
	switchToScreen2: function(){
		this.game.state.start('Screen2');
	}
};

mygame.Screen2 = function(game){
	this.game = game;
};
mygame.Screen2.prototype = {
	create: function() {
		// black background
		game.stage.backgroundColor = 0x000000;

		// initialise background star effect
		this.stars = [];
		createStars(this.game, this.stars);

		// add text
		var x = this.game.rnd.integerInRange(0, 500);
		var y = this.game.rnd.integerInRange(0, 400);
		var style = { font: "65px Arial", fill: "#4400ff", align: "center" };
		var text = this.game.add.text(x, y, "Screen2\nTap to go back.", style);
		// tap input handler
		this.game.input.onDown.add(this.doTap, this);
		// -- FADE IN --
		console.log('Screen2.create -- start fade in..');
		doFadeIn(this.game, true);
	},
	update: function() {
		console.log('Screen2.update is running..');
		updateStars(this.game, this.stars);
	},
	doTap: function(){
		// -- FADE OUT --
		console.log('Screen2.doTap -- start fade out..');
		var t = doFadeIn(this.game, false);
		t.onComplete.add(this.backToScreen1, this);
	},
	backToScreen1: function(){
		this.game.state.start('Screen1');
	}
};

// -------------------------------------
// define Phaser game and add states
// -------------------------------------
var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, 'phaser-example');

game.state.add('Screen1', mygame.Screen1);
game.state.add('Screen2', mygame.Screen2);
game.state.start('Screen1');
