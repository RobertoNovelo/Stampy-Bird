var GroundGraphicsComponent = function(entity) {
    this.entity = entity;
    this.canvas = document.getElementById('main-canvas');
};

GroundGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "#403A20";
	context.beginPath();
    context.rect(0, 0, this.canvas.width, .01);
	context.closePath();
	context.fill();
    context.restore();
};

exports.GroundGraphicsComponent = GroundGraphicsComponent;