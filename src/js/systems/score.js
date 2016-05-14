var ScoreSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.interval = null;
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.stop = function() {
    var that = this;
    clearInterval(that.interval);
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