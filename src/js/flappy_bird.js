var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSpawnSystem = require('./systems/pipespawn');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var ground = require('./entities/ground');
var pipecleaner = require('./entities/pipecleaner');
// var scoreblock = require('./entities/scoreblock');

var FlappyBird = function() {
    this.entities = [new bird.Bird(),new pipecleaner.PipeCleaner(),new ground.Ground(true),new ground.Ground(false)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipespawn = new pipeSpawnSystem.PipeSpawnSystem(this.entities);
};

FlappyBird.prototype.init = function() {
    var bird = this.entities[0];
    bird.components.physics.position.y = 0.6;
    bird.components.physics.position.x = -0.1;
    bird.components.physics.acceleration.y = 0;
    setTimeout(function(){
        bird.components.physics.acceleration.y = -2;
    },6000);
    this.entities.splice(5, this.entities.length-5);
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
    this.stop();
};

exports.FlappyBird = FlappyBird;