var RectCollisionComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type == 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collision.type == 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
  return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function (entity) {
  var positionA = this.entity.components.physics.position;
  var   positionB = entity.components.physics.position;
  var   sizeA = this.size;
  var   sizeB = entity.components.collision.size;

  var centerA = {
        x: positionA.x + sizeB.x / 2,
        y: positionA.y + sizeA.y / 2
      };
  var centerB = {
        x: positionB.x + sizeB.x / 2,
        y: positionB.y + sizeB.y / 2
      };

  var leftA   = centerA.x - (sizeA.x/2);
  var rightA  = centerA.x + (sizeA.x/2);
  var topA    = centerA.y + (sizeA.y/2);
  var bottomA = centerA.y - (sizeA.y/2);
  var leftB   = centerB.x - (sizeB.x/2);
  var rightB  = centerB.x + (sizeB.x/2);
  var topB    = centerB.y + (sizeB.y/2);
  var bottomB = centerB.y - (sizeB.y/2);

  return !(leftA   > rightB || leftB   > rightA ||
           bottomA > topB   || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
