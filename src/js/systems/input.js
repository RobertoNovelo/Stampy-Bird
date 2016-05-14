var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
    if(0==bird.components.physics.acceleration.y)
    {
    	bird.components.physics.acceleration.y = -2;
    }
};

exports.InputSystem = InputSystem;