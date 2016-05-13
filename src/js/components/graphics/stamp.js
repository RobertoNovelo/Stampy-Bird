var StampGraphicsComponent = function(entity) {
    this.entity = entity;
};

StampGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var size = this.entity.size;

    context.save();
    context.fillStyle = "black";
    context.fillRect(position.x, position.y, size.x, size.y);
    context.restore();
};

exports.StampGraphicsComponent = StampGraphicsComponent;
