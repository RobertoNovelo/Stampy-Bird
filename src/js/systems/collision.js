var bird = require('../entities/bird');
var pipe = require('../entities/pipe');
var pipecleaner = require('../entities/pipecleaner');

var CollisionSystem = function(entities,pipeSpawnSystem,graphicsSystem,scoreSystem,physicsSystemStop) {
  this.entities = entities;
  this.interval = null;
  this.graphicsSystem = graphicsSystem;
  this.pipeSpawnSystem = pipeSpawnSystem;
  this.scoreSystem = scoreSystem;
  this.physicsSystemStop = physicsSystemStop;
};

CollisionSystem.prototype.run = function() {
  this.interval = window.setInterval(this.tick.bind(this), 1000 /60);
};

CollisionSystem.prototype.stop = function() {
  clearInterval(this.interval);
};

CollisionSystem.prototype.tick = function() {
  // loop to find first entity
  for (var i=0; i<this.entities.length; i++) {
    var entityA = this.entities[i];
    //skips to next entity if there are no  collision component
    if (!('collision' in entityA.components)) {
      continue;
    }
    // second loop to find next entity
    for (var j=i+1; j<this.entities.length; j++) {
      var entityB = this.entities[j];
      //skips to next entitiy if no collision component
      if (!('collision' in entityB.components)) {
        continue;
      }

      if (!(entityA.components.collision.collidesWith(entityB))) {
        continue;
      }

      if (entityA.components.collision.onCollision) {
        entityA.components.collision.onCollision(entityB);

        if (entityA instanceof bird.Bird) {
          var canvas = document.getElementById('main-canvas');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.entities[0].components.physics.position.y = 100;
          this.entities[0].components.physics.velocity.y = 0;
          this.entities[0].components.physics.acceleration.y = 0;
          this.entities.splice(5, this.entities.length-5);
          this.scoreSystem.enable(false);
          this.graphicsSystem.stop();
          this.pipeSpawnSystem.stop();
          this.physicsSystemStop();
          this.stop();
          $("#promptsavescore-container").fadeIn();
        }

        if (entityA instanceof pipecleaner.PipeCleaner){
          this.entities.splice(5,2);
        }
      }

      if (entityB.components.collision.onCollision) {
        entityB.components.collision.onCollision(entityA);
        if (entityB instanceof bird.Bird) {
          var canvas = document.getElementById('main-canvas');
          var context = canvas.getContext('2d');
          this.entities[0].components.physics.position.y = 0;
          this.entities[0].components.physics.velocity.y = 0;
          this.entities[0].components.physics.acceleration.y = 0;
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.entities.splice(5, this.entities.length-5);
          this.scoreSystem.enable(false);
          this.graphicsSystem.stop();
          this.pipeSpawnSystem.stop();
          this.physicsSystemStop();
          this.stop();
          $("#promptsavescore-container").fadeIn();
        }

      }

    }
  }
};

exports.CollisionSystem = CollisionSystem;
