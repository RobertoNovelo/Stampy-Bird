var pipe = require('../entities/pipe');

var PipeSpawnSystem = function(entities) {
    this.entities = entities;
    this.interval = null;
    this.envimage = new Image();
    envelopeImageLoaded = false;
    this.setEnvImageLoaded = function()
    {
    	envelopeImageLoaded = true;
    };
    this.envimage.src = "./src/img/envelope.png"
    this.envimage.onload = this.setEnvImageLoaded;
};

PipeSpawnSystem.prototype.run = function() {
    this.interval = window.setInterval(this.tick.bind(this), 3000);
}

PipeSpawnSystem.prototype.stop = function() {
    clearInterval(this.interval);
}

PipeSpawnSystem.prototype.tick = function() {
	var offset = Math.floor(Math.random() * 6);
	if(envelopeImageLoaded)
	{
    	this.entities.push(new pipe.Pipe(true,offset,this.envimage),new pipe.Pipe(false,offset,this.envimage));
    }
};

exports.PipeSpawnSystem = PipeSpawnSystem;