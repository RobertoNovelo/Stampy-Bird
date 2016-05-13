var pipe = require('../entities/pipe');

var PipeSpawnSystem = function(entities) {
    this.entities = entities;
};

PipeSpawnSystem.prototype.run = function() {
    this.interval = window.setInterval(this.tick.bind(this), 2000);
}

PipeSpawnSystem.prototype.tick = function() {
    this.entities.push(new pipe.Pipe(0,1),new pipe.Pipe(.7,1));
};

exports.PipeSpawnSystem = PipeSpawnSystem;