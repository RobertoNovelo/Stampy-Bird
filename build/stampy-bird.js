/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var flappyBird = __webpack_require__(1);
	
	var app = new flappyBird.FlappyBird();
	app.run();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var graphicsSystem = __webpack_require__(2);
	var physicsSystem = __webpack_require__(3);
	var inputSystem = __webpack_require__(14);
	var pipeSpawnSystem = __webpack_require__(15);
	
	var bird = __webpack_require__(5);
	var pipe = __webpack_require__(9);
	var ground = __webpack_require__(16);
	var pipecleaner = __webpack_require__(12);
	
	var FlappyBird = function () {
	    this.entities = [new bird.Bird(), new pipecleaner.PipeCleaner(), new ground.Ground(true), new ground.Ground(false)];
	    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	    this.physics = new physicsSystem.PhysicsSystem(this.entities);
	    this.input = new inputSystem.InputSystem(this.entities);
	    this.pipespawn = new pipeSpawnSystem.PipeSpawnSystem(this.entities);
	};
	
	FlappyBird.prototype.run = function () {
	    this.pipespawn.run();
	    this.graphics.run();
	    this.physics.run();
	    this.input.run();
	};
	
	exports.FlappyBird = FlappyBird;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var GraphicsSystem = function (entities) {
	    this.entities = entities;
	    // Canvas is where we draw
	    this.canvas = document.getElementById('main-canvas');
	    // Context is what we draw to
	    this.context = this.canvas.getContext('2d');
	};
	
	GraphicsSystem.prototype.run = function () {
	    // Run the render loop
	    window.requestAnimationFrame(this.tick.bind(this));
	};
	
	GraphicsSystem.prototype.tick = function () {
	    // Set the canvas to the correct size if the window is resized
	    if (this.canvas.width != this.canvas.offsetWidth || this.canvas.height != this.canvas.offsetHeight) {
	        this.canvas.width = this.canvas.offsetWidth;
	        this.canvas.height = this.canvas.offsetHeight;
	    }
	
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	    this.context.save();
	    this.context.translate(this.canvas.width / 2, this.canvas.height);
	    this.context.scale(this.canvas.height, -this.canvas.height);
	
	    for (var i = 0; i < this.entities.length; i++) {
	        var entity = this.entities[i];
	        if (!'graphics' in entity.components) {
	            continue;
	        }
	
	        entity.components.graphics.draw(this.context);
	    }
	
	    this.context.restore();
	
	    window.requestAnimationFrame(this.tick.bind(this));
	};
	
	exports.GraphicsSystem = GraphicsSystem;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var collisionSystem = __webpack_require__(4);
	
	var PhysicsSystem = function (entities) {
	    this.entities = entities;
	    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
	    this.interval = null;
	};
	
	PhysicsSystem.prototype.run = function () {
	    // Run the update loop
	    this.interval = window.setInterval(this.tick.bind(this), 1000 / 60);
	};
	
	PhysicsSystem.prototype.tick = function () {
	    for (var i = 0; i < this.entities.length; i++) {
	        var entity = this.entities[i];
	        if (!'physics' in entity.components) {
	            continue;
	        }
	
	        entity.components.physics.update(1 / 60);
	    }
	    this.collisionSystem.tick();
	};
	
	PhysicsSystem.prototype.pause = function () {
	    clearInterval(this.interval);
	};
	
	exports.PhysicsSystem = PhysicsSystem;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var graphicsSystem = __webpack_require__(2);
	
	var bird = __webpack_require__(5);
	var pipe = __webpack_require__(9);
	var pipecleaner = __webpack_require__(12);
	
	var CollisionSystem = function (entities, physics) {
	  this.entities = entities;
	  this.physics = physics;
	  this.graphicsSystem = new graphicsSystem.GraphicsSystem();
	};
	
	CollisionSystem.prototype.run = function () {
	  window.setInterval(this.tick.bind(this), 1000 / 60);
	};
	
	CollisionSystem.prototype.tick = function () {
	  // loop to find first entity
	  for (var i = 0; i < this.entities.length; i++) {
	    var entityA = this.entities[i];
	    //skips to next entity if there are no  collision component
	    if (!('collision' in entityA.components)) {
	      continue;
	    }
	    // second loop to find next entity
	    for (var j = i + 1; j < this.entities.length; j++) {
	      var entityB = this.entities[j];
	      //skips to next entitiy if no collision component
	      if (!('collision' in entityB.components)) {
	        continue;
	      }
	
	      if (!entityA.components.collision.collidesWith(entityB)) {
	        continue;
	      }
	
	      if (entityA.components.collision.onCollision) {
	        entityA.components.collision.onCollision(entityB);
	
	        if (entityA instanceof bird.Bird) {
	          //takes all pipes off
	          // this.entities.splice(4, this.entities.length-4);
	        }
	
	        if (entityA instanceof pipecleaner.PipeCleaner) {
	          //takes 2 pipes off that are off screen
	          this.entities.splice(4, 2);
	        }
	      }
	
	      if (entityB.components.collision.onCollision) {
	        entityB.components.collision.onCollision(entityA);
	        if (entityB instanceof bird.Bird) {
	          //takes all pipes off
	          this.entities.splice(4, this.entities.length - 4);
	        }
	      }
	    }
	  }
	};
	
	exports.CollisionSystem = CollisionSystem;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var physicsComponent = __webpack_require__(6);
	var graphicsComponent = __webpack_require__(7);
	var collisionComponent = __webpack_require__(8);
	// var settings = require("../settings");
	
	var Bird = function () {
	    var physics = new physicsComponent.PhysicsComponent(this);
	    physics.position.y = 0.5;
	    physics.position.x = 0;
	    this.radius = 0.02;
	    physics.acceleration.y = -2;
	
	    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	    var collision = new collisionComponent.CircleCollisionComponent(this, this.radius);
	    collision.onCollision = this.onCollision.bind(this);
	
	    this.components = {
	        physics: physics,
	        graphics: graphics,
	        collision: collision
	    };
	};
	
	Bird.prototype.onCollision = function (entity) {
	    console.log(this);
	    console.log("Bird collided with entity:", entity);
	};
	
	exports.Bird = Bird;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var PhysicsComponent = function (entity) {
	    this.entity = entity;
	
	    this.position = {
	        x: 0,
	        y: 0
	    };
	    this.velocity = {
	        x: 0,
	        y: 0
	    };
	    this.acceleration = {
	        x: 0,
	        y: 0
	    };
	};
	
	PhysicsComponent.prototype.update = function (delta) {
	    this.velocity.x += this.acceleration.x * delta;
	    this.velocity.y += this.acceleration.y * delta;
	
	    this.position.x += this.velocity.x * delta;
	    this.position.y += this.velocity.y * delta;
	};
	
	exports.PhysicsComponent = PhysicsComponent;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var BirdGraphicsComponent = function (entity) {
	    this.entity = entity;
	};
	
	BirdGraphicsComponent.prototype.draw = function (context) {
	    var position = this.entity.components.physics.position;
	    var radius = this.entity.radius;
	
	    context.save();
	    context.beginPath();
	    context.fillStyle = "black";
	    context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
	    context.fill();
	    context.restore();
	};
	
	exports.BirdGraphicsComponent = BirdGraphicsComponent;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var CircleCollisionComponent = function (entity, radius) {
	  this.entity = entity;
	  this.radius = radius;
	  this.type = 'circle';
	};
	
	CircleCollisionComponent.prototype.collidesWith = function (entity) {
	  if (entity.components.collision.type == 'circle') {
	    return this.collideCircle(entity);
	  } else if (entity.components.collision.type == 'rect') {
	    return this.collideRect(entity);
	  }
	  return false;
	};
	
	CircleCollisionComponent.prototype.collideCircle = function (entity) {
	  var positionA = this.entity.components.physics.position; // circle
	  var positionB = entity.components.physics.position; // other circle
	  var diff = { x: positionA.x - positionB.x,
	    y: positionA.y - positionB.y };
	
	  var radiusA = this.radius;
	  var radiusB = entity.components.collision.radius;
	  var radiusSum = radiusA + radiusB;
	
	  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
	
	  return distanceSquared < radiusSum * radiusSum;
	};
	
	CircleCollisionComponent.prototype.collideRect = function (entity) {
	  var positionA = this.entity.components.physics.position;
	  var positionB = entity.components.physics.position;
	  var sizeB = entity.components.collision.size;
	  var radiusA = this.radius;
	  var centerB = {
	    x: positionB.x + sizeB.x / 2,
	    y: positionB.y + sizeB.y / 2
	  };
	
	  var clamp = function (value, low, high) {
	    if (value < low) {
	      return low;
	    }
	    if (value > high) {
	      return high;
	    }
	    return value;
	  };
	
	  var closest = {
	    x: clamp(positionA.x, centerB.x - sizeB.x / 2, centerB.x + sizeB.x / 2),
	    y: clamp(positionA.y, centerB.y - sizeB.y / 2, centerB.y + sizeB.y / 2)
	  };
	
	  var diff = { x: positionA.x - closest.x,
	    y: positionA.y - closest.y };
	
	  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
	  return distanceSquared < radiusA * radiusA;
	};
	
	exports.CircleCollisionComponent = CircleCollisionComponent;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var physicsComponent = __webpack_require__(6);
	var graphicsComponent = __webpack_require__(10);
	var collisionComponent = __webpack_require__(11);
	// var settings = require("../settings");
	
	var Pipe = function (topPipe, offset) {
	    var physics = new physicsComponent.PhysicsComponent(this);
	    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	    physics.position.topPipe = topPipe;
	    if (topPipe) {
	        physics.position.y = 0.7;
	    } else {
	        physics.position.y = 0;
	    }
	    physics.position.x = 4000 / graphics.canvas.width;
	    physics.velocity.x = -0.4;
	
	    switch (offset) {
	        case 0:
	            physics.position.offset = -0.2;
	            break;
	        case 1:
	            physics.position.offset = -0.1;
	            break;
	        case 3:
	            physics.position.offset = 0;
	            break;
	        case 4:
	            physics.position.offset = 0.1;
	            break;
	        case 5:
	            physics.position.offset = 0.2;
	            break;
	        default:
	            physics.position.offset = 0;
	            break;
	    }
	
	    if (topPipe) {
	        this.size = {
	            x: 0.2,
	            y: .4 + physics.position.offset
	        };
	        physics.position.y = physics.position.y - physics.position.offset;
	    } else {
	        this.size = {
	            x: 0.2,
	            y: .4 - physics.position.offset
	        };
	    }
	
	    var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	    collision.onCollision = this.onCollision.bind(this);
	
	    this.components = {
	        physics: physics,
	        graphics: graphics,
	        collision: collision
	    };
	};
	
	Pipe.prototype.onCollision = function (entity) {
	    console.log(this);
	    console.log("Pipe collided with entity:", entity);
	};
	
	exports.Pipe = Pipe;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var PipeGraphicsComponent = function (entity) {
	    this.entity = entity;
	    this.canvas = document.getElementById('main-canvas');
	};
	
	PipeGraphicsComponent.prototype.draw = function (context) {
	    var position = this.entity.components.physics.position;
	    var size = this.entity.size;
	
	    context.save();
	    context.fillStyle = "green";
	    context.fillRect(position.x, position.y, size.x, size.y);
	    context.restore();
	};
	
	exports.PipeGraphicsComponent = PipeGraphicsComponent;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var RectCollisionComponent = function (entity, size) {
	  this.entity = entity;
	  this.size = size;
	  this.type = 'rect';
	};
	
	RectCollisionComponent.prototype.collidesWith = function (entity) {
	  if (entity.components.collision.type == 'circle') {
	    return this.collideCircle(entity);
	  } else if (entity.components.collision.type == 'rect') {
	    return this.collideRect(entity);
	  }
	  return false;
	};
	
	RectCollisionComponent.prototype.collideCircle = function (entity) {
	  return entity.components.collision.collideRect(this.entity);
	};
	
	RectCollisionComponent.prototype.collideRect = function (entity) {
	  var positionA = this.entity.components.physics.position;
	  var positionB = entity.components.physics.position;
	  var sizeA = this.size;
	  var sizeB = entity.components.collision.size;
	
	  var centerA = {
	    x: positionA.x + sizeB.x / 2,
	    y: positionA.y + sizeA.y / 2
	  };
	  var centerB = {
	    x: positionB.x + sizeB.x / 2,
	    y: positionB.y + sizeB.y / 2
	  };
	
	  var leftA = centerA.x - sizeA.x / 2;
	  var rightA = centerA.x + sizeA.x / 2;
	  var topA = centerA.y + sizeA.y / 2;
	  var bottomA = centerA.y - sizeA.y / 2;
	  var leftB = centerB.x - sizeB.x / 2;
	  var rightB = centerB.x + sizeB.x / 2;
	  var topB = centerB.y + sizeB.y / 2;
	  var bottomB = centerB.y - sizeB.y / 2;
	
	  return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
	};
	
	exports.RectCollisionComponent = RectCollisionComponent;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var graphicsComponent = __webpack_require__(13);
	var physicsComponent = __webpack_require__(6);
	var collisionComponent = __webpack_require__(11);
	
	var PipeCleaner = function () {
	  this.name = 'PipeCleaner';
	  this.color = 'rgb(99,71,48)';
	  this.size = {
	    x: 0.001,
	    y: 1
	  };
	
	  var physics = new physicsComponent.PhysicsComponent(this);
	  physics.position.x = -document.getElementById('main-canvas').width / 200;
	  physics.position.y = 0.1;
	
	  var graphics = new graphicsComponent.RectGraphicsComponent(this);
	  var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	  collision.onCollision = this.onCollision.bind(this);
	
	  this.components = {
	    physics: physics,
	    graphics: graphics,
	    collision: collision
	  };
	};
	
	PipeCleaner.prototype.onCollision = function (entity) {
	  //console.log("PipeCleaner collided with entity:", entity);
	};
	
	exports.PipeCleaner = PipeCleaner;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var RectGraphicsComponent = function (entity) {
	    this.entity = entity;
	    this.canvas = document.getElementById('main-canvas');
	};
	
	RectGraphicsComponent.prototype.draw = function (context) {
	    var position = this.entity.components.physics.position;
	    var size = this.entity.size;
	    var color = this.entity.color;
	
	    context.save();
	    context.fillStyle = color;
	    context.fillRect(position.x, position.y, size.x, size.y);
	    context.restore();
	};
	
	exports.RectGraphicsComponent = RectGraphicsComponent;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var InputSystem = function (entities) {
	    this.entities = entities;
	
	    // Canvas is where we get input from
	    this.canvas = document.getElementById('main-canvas');
	};
	
	InputSystem.prototype.run = function () {
	    this.canvas.addEventListener('click', this.onClick.bind(this));
	};
	
	InputSystem.prototype.onClick = function () {
	    var bird = this.entities[0];
	    bird.components.physics.velocity.y = 0.7;
	};
	
	exports.InputSystem = InputSystem;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var pipe = __webpack_require__(9);
	
	var PipeSpawnSystem = function (entities) {
	    this.entities = entities;
	};
	
	PipeSpawnSystem.prototype.run = function () {
	    this.interval = window.setInterval(this.tick.bind(this), 3000);
	};
	
	PipeSpawnSystem.prototype.tick = function () {
	    var offset = Math.floor(Math.random() * 6);
	    this.entities.push(new pipe.Pipe(true, offset), new pipe.Pipe(false, offset));
	};
	
	exports.PipeSpawnSystem = PipeSpawnSystem;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var physicsComponent = __webpack_require__(6);
	var graphicsComponent = __webpack_require__(17);
	var collisionComponent = __webpack_require__(11);
	// var settings = require("../settings");
	
	var Ground = function (topGround) {
	    var physics = new physicsComponent.PhysicsComponent(this);
	    var graphics = new graphicsComponent.GroundGraphicsComponent(this);
	    physics.position.topGround = topGround;
	    if (topGround) {
	        physics.position.y = 1;
	        this.size = {
	            x: 1,
	            y: 0.02
	        };
	    } else {
	        physics.position.y = 0;
	        this.size = {
	            x: document.getElementById('main-canvas').width,
	            y: 0.02
	        };
	    }
	
	    physics.position.x = -graphics.canvas.width;
	
	    var collision = new collisionComponent.RectCollisionComponent(this, this.size);
	    collision.onCollision = this.onCollision.bind(this);
	
	    this.components = {
	        physics: physics,
	        graphics: graphics,
	        collision: collision
	    };
	};
	
	Ground.prototype.onCollision = function (entity) {
	    // console.log("Ground collided with entity:", entity);
	};
	
	exports.Ground = Ground;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var GroundGraphicsComponent = function (entity) {
	    this.entity = entity;
	    this.canvas = document.getElementById('main-canvas');
	};
	
	GroundGraphicsComponent.prototype.draw = function (context) {
	    var position = this.entity.components.physics.position;
	
	    context.save();
	    context.translate(position.x, position.y);
	    context.fillStyle = "green";
	    context.beginPath();
	    context.rect(0, 0, this.canvas.width, .01);
	    context.closePath();
	    context.fill();
	    context.restore();
	};
	
	exports.GroundGraphicsComponent = GroundGraphicsComponent;

/***/ }
/******/ ]);
//# sourceMappingURL=stampy-bird.js.map