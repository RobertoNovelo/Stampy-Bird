var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var stampGraphicsComponent = require("../components/graphics/stamp");
var collisionComponent = require("../components/collision/circle");
// var settings = require("../settings");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.6;
    physics.position.x = -0.1;
    this.radius = 0.02;
    this.size = {
        x: 0.07,
        y: 0.07
    };
    physics.acceleration.y = 0;

    var graphics = new stampGraphicsComponent.StampGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, this.radius);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {
    // console.log(this);
    // console.log("Bird collided with entity:", entity);
};

exports.Bird = Bird;