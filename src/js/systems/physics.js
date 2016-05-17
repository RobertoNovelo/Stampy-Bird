var collisionSystem = require("./collision");

var PhysicsSystem = function(entities,pipeSpawnSystem,graphicsSystem,scoreSystem)
{
    this.entities = entities;
    this.stopInterval = function()
    {
        clearInterval(this.interval);
    }
    this.collisionSystem = new collisionSystem.CollisionSystem(entities,pipeSpawnSystem,graphicsSystem,scoreSystem,this.stopInterval);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.stop = function()
{
    clearInterval(this.interval);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
};


exports.PhysicsSystem = PhysicsSystem;