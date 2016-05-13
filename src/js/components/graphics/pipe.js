var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.canvas = document.getElementById('main-canvas');
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var size = this.entity.size;

    context.save();
    context.fillStyle = "green";
    context.fillRect(position.x, position.y, size.x, size.y);
    context.restore();
}

exports.PipeGraphicsComponent = PipeGraphicsComponent;