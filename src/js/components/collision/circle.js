var CircleCollisionComponent = function(entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type == 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collision.type == 'rect') {
    return this.collideRect(entity);
  }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
  var positionA = this.entity.components.physics.position; // circle
  var positionB = entity.components.physics.position; // other circle
  var diff = {x: positionA.x - positionB.x,
              y: positionA.y - positionB.y};

  var radiusA = this.radius;
  var radiusB = entity.components.collision.radius;
  var radiusSum = radiusA + radiusB;

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;


  return (distanceSquared < radiusSum * radiusSum);
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collision.size;
  var radiusA = this.radius;
  var centerB = {
    x: positionB.x + sizeB.x/2,
    y: positionB.y + sizeB.y/2
  };

  var clamp = function(value, low, high) {
    if (value < low) {
     return low;
    }
    if (value > high) {
      return high;
    }
      return value;
  };

  var closest = {
    x:  clamp(
          positionA.x,
          centerB.x - sizeB.x / 2,
          centerB.x + sizeB.x / 2
        ),
    y:  clamp(
          positionA.y,
          centerB.y - sizeB.y / 2,
          centerB.y + sizeB.y / 2
        )
    };

  var diff = {x: positionA.x - closest.x,
              y: positionA.y - closest.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
