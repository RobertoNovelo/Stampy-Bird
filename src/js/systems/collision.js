var graphicsSystem = require('./graphics');

var bird = require('../entities/bird');
var pipe = require('../entities/pipe');
var pipecleaner = require('../entities/pipecleaner');

var CollisionSystem = function(entities, physics) {
  this.entities = entities;
  this.physics = physics;
  this.graphicsSystem = new graphicsSystem.GraphicsSystem();
};

CollisionSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000 /60);
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
          //takes all pipes off
          // this.entities.splice(4, this.entities.length-4);
        }

        if (entityA instanceof pipecleaner.PipeCleaner){
          //takes 2 pipes off that are off screen
          this.entities.splice(4,2);
        }
      }

      if (entityB.components.collision.onCollision) {
        entityB.components.collision.onCollision(entityA);
        if (entityB instanceof bird.Bird) {
          //takes all pipes off
          this.entities.splice(4, this.entities.length-4);
        }

      }

    }
  }
};

exports.CollisionSystem = CollisionSystem;
