var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/ground");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Ground = function(topGround)
{
    var physics = new physicsComponent.PhysicsComponent(this);
    var graphics = new graphicsComponent.GroundGraphicsComponent(this);
    physics.position.topGround = topGround;
    if(topGround)
    {
        physics.position.y = 1;
        this.size = {
            x: (document.getElementById('main-canvas').width),
            y: 0.02
        };
    }
    else
    {
        physics.position.y = 0;
        this.size = {
            x: (document.getElementById('main-canvas').width),
            y: 0.03
        };
    }

    physics.position.x = -graphics.canvas.width;

    var collision = new collisionComponent.RectCollisionComponent(this, this.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Ground.prototype.onCollision = function(entity) {
    // console.log("Ground collided with entity:", entity);
};

exports.Ground = Ground;