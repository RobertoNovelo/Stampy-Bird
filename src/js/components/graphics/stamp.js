var StampGraphicsComponent = function(entity) {
    this.entity = entity;
    this.image = null;
    imageLoaded = false;
    this.setImageLoaded = function()
    {
    	imageLoaded = true;
    };
};

StampGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var size = this.entity.size;

    if(imageLoaded)
    {
		context.save();
		context.translate(position.x, position.y);
        context.rotate(Math.PI);
        context.scale(-1, 1);
		context.drawImage(this.image, -(size.x/2) , -(size.y/2) ,size.x * (0.1/size.y) * ((this.image.width>this.image.height)?(this.image.width/this.image.height):(this.image.height/this.image.width)),size.y);
        // context.drawImage(this.image,-0.1,0,this.image.width * (0.1/this.image.height), 0.1);
		context.restore();
    }
    else
    {
		context.save();
		context.fillStyle = "black";
		context.fillRect(position.x, position.y, size.x, size.y);
		context.restore();
    }
};

StampGraphicsComponent.prototype.updateImage = function(imageUrl)
{
	this.imageLoaded = false;
	this.image = new Image();
    this.image.onload = this.setImageLoaded;
	this.image.src = imageUrl;
};

exports.StampGraphicsComponent = StampGraphicsComponent;
