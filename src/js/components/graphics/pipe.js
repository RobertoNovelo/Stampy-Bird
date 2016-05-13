var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.canvas = document.getElementById('main-canvas');
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    if(position.topPipe)
    {
        context.translate(position.x, position.y - position.offset);
    }
    else
    {
        context.translate(position.x, position.y);
    }

    context.fillStyle = "green";
	context.beginPath();
    if(position.topPipe)
    {
        context.rect(0, 0, .1, .4 + position.offset);
    }
    else
    {
        context.rect(0, 0, .1, .4 - position.offset);
    }

	context.closePath();
	context.fill();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;