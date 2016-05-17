var graphicsComponent = require("../components/graphics/rect");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var scoreSystem = require("../systems/score");

var Score = function() {
  this.color = 'rgba(0,0,0,0)';
  this.size = {
    x: 0.001,
    y: 0.8
  };

  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = -0.2;
  physics.position.y = 0;

  var graphics = new graphicsComponent.RectGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, this.size);
  var score = new scoreSystem.ScoreSystem();
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision,
    scoreSystem:score
  };

  var allowScore = true;

  this.getAllowScore = function()
  {
    return allowScore;
  };

  this.disableAllowScore = function()
  {
    allowScore = false;
  };

  this.enableAllowScore = function()
  {
    allowScore = true;
  };
};

Score.prototype.onCollision = function(entity)
{
  console.log(this);
  if(this.getAllowScore())
  {
    this.components.scoreSystem.plusPlus();
    $("#score").text(this.components.scoreSystem.getScore());
    this.disableAllowScore();
    setTimeout(this.enableAllowScore,1000);
  }
};

exports.Score = Score;
