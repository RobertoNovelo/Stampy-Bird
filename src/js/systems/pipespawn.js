var pipe = require('../entities/pipe');

var PipeSpawnSystem = function(entities) {
    this.entities = entities;
};

PipeSpawnSystem.prototype.run = function() {
    this.interval = window.setInterval(this.tick.bind(this), 3000);
}

PipeSpawnSystem.prototype.tick = function() {
	var offset = Math.floor(Math.random() * 6);
    this.entities.push(new pipe.Pipe(true,offset),new pipe.Pipe(false,offset));
};

exports.PipeSpawnSystem = PipeSpawnSystem;