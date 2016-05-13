var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "green";
	context.beginPath();
	context.rect(0, 0, .1, .3);
	context.closePath();
	context.fill();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;