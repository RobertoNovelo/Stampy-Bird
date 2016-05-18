var PipeGraphicsComponent = function(entity,image) {
    this.entity = entity;
    this.canvas = document.getElementById('main-canvas');
    this.envimage = image;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var size = this.entity.size;

	context.save();
	context.translate(position.x, position.y);
	context.rotate(Math.PI/2);
	context.drawImage(this.envimage,0,0,size.y,-size.x);
	context.restore();
}

exports.PipeGraphicsComponent = PipeGraphicsComponent;