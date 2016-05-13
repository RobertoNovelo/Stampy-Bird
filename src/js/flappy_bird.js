var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSpawnSystem = require('./systems/pipespawn');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var ground = require('./entities/ground');
var pipecleaner = require('./entities/pipecleaner');
var scoreblock = require('./entities/scoreblock');

var FlappyBird = function() {
    this.entities = [];
	this.graphics = null;
	this.physics = null;
	this.input = null;
	this.pipespawn = null;
};

FlappyBird.prototype.init = function() {
	this.entities = [new bird.Bird(),new pipecleaner.PipeCleaner(),new ground.Ground(true),new ground.Ground(false),new scoreblock.ScoreBlock()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipespawn = new pipeSpawnSystem.PipeSpawnSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.pipespawn.run();
    this.graphics.run();
    this.physics.run();
    this.input.run();
};

FlappyBird.prototype.stop = function() {
    this.pipespawn.stop();
    this.graphics.stop();
    this.physics.stop();
};

FlappyBird.prototype.clearGame = function() {
    var canvas = document.getElementById('main-canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
	this.entities = [];
	this.graphics = null;
	this.physics = null;
	this.input = null;
	this.pipespawn = null;
};

exports.FlappyBird = FlappyBird;