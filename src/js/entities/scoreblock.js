var graphicsComponent = require("../components/graphics/rect");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var ScoreBlock = function() {
  this.size = {
    x: 0.001,
    y: 0.001
  };

  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = 0;
  physics.position.y = 0;

  var graphics = new graphicsComponent.RectGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, this.size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision
  };
};

ScoreBlock.prototype.onCollision = function(entity) {
  console.log("score ++");
};

exports.ScoreBlock = ScoreBlock;
