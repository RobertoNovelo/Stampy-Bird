var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/pipe");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Pipe = function(x,y) {

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = x;
    physics.position.x = y;
    physics.velocity.x = -0.4;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Pipe.prototype.onCollision = function(entity) {
    // console.log("Pipe collided with entity:", entity);
};

exports.Pipe = Pipe;