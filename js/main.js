var P2Game = {};
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

P2Game.StateA = function (game) {

    var player;
    var map;
    var layer;
    var bg;
    var spikes;
    var spikes2;
    var spikes3;
    var spikes4;
    var spikes5;
},

P2Game.StateA.prototype = {

preload: function () {

	game.load.image('background', 'assets/sprites/background-stars.png');
	game.load.image('spikes', 'assets/sprites/spikes.png');
	game.load.image('tree', 'assets/sprites/tree.png');
 	game.load.tilemap('hospital', 'js/map.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('blueblack', 'assets/sprites/blueblacktile.png'); 	
	game.load.image('player', 'assets/sprites/player.png');
},

    create: function () {

	bg = game.add.tileSprite(0, 0, 2000, 600, 'background');
	bg.scale.set(1.75,1.75);

	spikes = game.add.sprite(590,550,'spikes');
	game.physics.arcade.enable(spikes);
	spikes.body.gravity.y = -200;
	spikes.scale.set(.5,.5);

	spikes2 = game.add.sprite(750,200,'spikes');
	game.physics.arcade.enable(spikes2);
	spikes2.body.gravity.y = -200;
	spikes2.scale.set(.5,.5);

	spikes3 = game.add.sprite(-110,350,'spikes');
	game.physics.arcade.enable(spikes3);
	spikes3.body.gravity.y = -200;
	spikes3.scale.set(.5,.5);

	spikes4 = game.add.sprite(2100,480,'spikes');
	game.physics.arcade.enable(spikes4);
	spikes4.body.gravity.y = -200;
	spikes4.scale.set(.25,.25);

	map = game.add.tilemap('hospital');
	map.addTilesetImage('blueblack');
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
 	map.setCollisionBetween(1, 12);

	var tree = game.add.sprite(350,35,'tree');
	var tree2 = game.add.sprite(120,335,'tree');
	var tree3 = game.add.sprite(330,475,'tree');	
	var tree4 = game.add.sprite(520,475,'tree');

	player = game.add.sprite(150,50,'player');
	game.physics.arcade.enable(player);
	player.animations.add('idle', [0],1,true);
	player.animations.add('left', [0,1,2,3],4,true);
	player.animations.add('right', [4,5,6,7],4,true);
	player.animations.play('right');
	player.body.collideWorldBounds = true;
	player.scale.set(.75,.75);
	game.camera.follow(player);

	game.physics.arcade.gravity.y = 200;
    cursors = input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },


    playerkill: function() {
        state.start('StateC');
},

    update: function() {

	game.physics.arcade.collide(player, layer);
	game.physics.arcade.overlap(player, spikes, playerkill, null, this);
	bg.tilePosition.x -= .05;
    
	if (cursors.left.isDown) {
        player.body.velocity.x = -100;
		if (facing != 'left'){
            player.animations.play('left');
            facing = 'left';
        }
    }
	else if (cursors.up.isDown && player.body.onFloor()){
        player.body.velocity.y = -200;
        if (facing != 'idle') {
            player.animations.play('idle');
            facing = 'idle';
        }
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
	        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        if (facing != 'idle') {
            player.animations.stop();
			player.body.velocity.x = 0;
            facing = 'idle';
		}
	}
},

    render: function () {
		
		game.debug.text("State A", 32, 560);
    }
};

P2Game.StateC = function (game) {

    player;
    cursors;
    result = 'Move with cursors. Hit an object to change State';

};

P2Game.StateC.prototype = {

    create: function () {

		game.stage.backgroundColor = '#00FFFF';
		var style3 = {font: "30px Arial", fill:"#DC143C"};
		var scoringstuff = "At least you tried? Refresh to play again!";
		var winstatement = game.add.text(50,200,scoringstuff,style3);
		},
		
		update: function () {},
		render: function () {}

};

game.state.add('StateA', P2Game.StateA);
game.state.add('StateC', P2Game.StateC);
game.state.start('StateA');