var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/pipe");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Pipe = function(topPipe,offset)
{
    var physics = new physicsComponent.PhysicsComponent(this);
    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    physics.position.topPipe = topPipe;
    if(topPipe)
    {
        physics.position.y = 0.7;
    }
    else
    {
        physics.position.y = 0;
    }
    physics.position.x = 4000/graphics.canvas.width;
    physics.velocity.x = -0.4;

    switch(offset) {
        case 0:
            physics.position.offset = -0.2;
            break;
        case 1:
            physics.position.offset = -0.1;
            break;
        case 3:
            physics.position.offset = 0;
            break;
        case 4:
            physics.position.offset = 0.1;
            break;
        case 5:
            physics.position.offset = 0.2;
            break;
        default:
            physics.position.offset = 0;
            break;
    }

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