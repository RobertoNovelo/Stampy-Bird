var InputSystem = function(entities,scoreSystem) {
    this.entities = entities;
    this.scoreSystem = scoreSystem;
    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
    this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
    if(0==bird.components.physics.acceleration.y)
    {
    	bird.components.physics.acceleration.y = -2;
    }
    // this.scoreSystem.plusPlus();
};

InputSystem.prototype.onTouch = function(e) {
    //console.log('touch');
    e.preventDefault();
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
    if(0==bird.components.physics.acceleration.y)
    {
        bird.components.physics.acceleration.y = -2;
    }
    // this.scoreSystem.plusPlus();
};

exports.InputSystem = InputSystem;